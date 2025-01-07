import UsersDBService from "../src/v1/models/user/UsersDBService.mjs";
import { parseBearer } from "../utils/jwtHelpers.mjs";

// Функція для налаштування аутентифікації та авторизації
const auth = (app) => {
  // Middleware для налаштування заголовків CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next(); // Передача обробки наступному middleware
  });

  // Middleware для перевірки аутентифікації та авторизації
  app.use((req, res, next) => {
    // Відкриті шляхи, які не потребують авторизації
    const openPaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/signup",
      "/api/v1/auth/login-with-credential",
      "/api/v1/products",
      "/api/v1/products/ua",
      "/api/v1/products/en",
      "/api/v1/categories",
      "/api/v1/categories/ua",
      "/api/v1/categories/en",
      "/api/v1/categories/with-subcategories/ua",
      "/api/v1/categories/with-subcategories/en",
      "/api/v1/subcategories",
      "/api/v1/subcategories/ua",
      "/api/v1/subcategories/en",
    ];
    if (req.headers.authorization) {
      try {
        req.user = parseBearer(req.headers.authorization, req.headers);
      } catch (error) {
        console.log(error);
      }
    }
    const isOpenPath =
      openPaths.includes(req.path) ||
      req.path.startsWith("/uploads/") ||
      req.path.startsWith("/api/v1/products/") ||
      req.path.startsWith("/api/v1/features/");

    if (!isOpenPath) {
      try {
        // Парсинг токена та додавання користувача до запиту

        req.user = parseBearer(req.headers.authorization, req.headers);
      } catch (err) {
        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ result: "Access Denied" });
      }
    }
    next(); // Передача обробки наступному middleware
  });
};

// Експорт функції auth як модуля за замовчуванням
export default auth;

export async function ensureAdmin(req, res, next) {
  const user = await UsersDBService.getById(req.user.id);
  if (user.type === "admin") {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
}
