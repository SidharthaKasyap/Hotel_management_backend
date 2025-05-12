# 📘 API Documentation — Card Hotel Management System

Base URL (local): `http://localhost:3000/api`

---

## 🛂 Auth Routes

### POST `/api/auth/register`

Register a new user.

**Request Body:**

```json
{
  "username": "john_doe",
  "password": "your_password"
}
```

**Response:**

- `201 Created`: User registered
- `400 Bad Request`: Validation error

---

### POST `/api/auth/login`

Login and receive a token.

**Request Body:**

```json
{
  "username": "john_doe",
  "password": "your_password"
}
```

**Response:**

```json
{
  "token": "jwt-token"
}
```

---

## 🏨 Hotel Routes

### GET `/api/hotels`

Get a list of all hotels.

**Query Params (optional):**

- `city`, `priceMin`, `priceMax` (if filtering implemented)

**Response:**

- `200 OK`: Array of hotel objects

---

### GET `/api/hotels/:id`

Get details of a specific hotel by ID.

**Response:**

- `200 OK`: Hotel object
- `404 Not Found`: Invalid hotel ID

---

### POST `/api/hotels`

Create a new hotel. _(Admin only)_

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "name": "Grand Palace",
  "location": "New York",
  "price": 150
}
```

**Response:**

- `201 Created`: Hotel created
- `403 Forbidden`: If user is not admin

---

### PUT `/api/hotels/:id`

Update an existing hotel. _(Admin only)_

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:** (Partial or full update)

```json
{
  "price": 180
}
```

**Response:**

- `200 OK`: Updated hotel
- `403 Forbidden`: If user is not admin

---

### DELETE `/api/hotels/:id`

Delete a hotel. _(Admin only)_

**Headers:**

- `Authorization: Bearer <token>`

**Response:**

- `204 No Content`: Hotel deleted
- `403 Forbidden`: If user is not admin

---

## 📅 Booking Routes

### POST `/api/bookings`

Create a new booking. _(Authenticated users only)_

**Headers:**

- `Authorization: Bearer <token>`

**Request Body:**

```json
{
  "hotelId": "1",
  "checkIn": "2025-06-01",
  "checkOut": "2025-06-05"
}
```

**Response:**

- `201 Created`: Booking created
- `401 Unauthorized`: Missing or invalid token

---

### GET `/api/bookings/my`

Get all bookings for the authenticated user.

**Headers:**

- `Authorization: Bearer <token>`

**Response:**

- `200 OK`: Array of bookings

---

### DELETE `/api/bookings/:id`

Cancel a booking by ID. _(Authenticated users only)_

**Headers:**

- `Authorization: Bearer <token>`

**Response:**

- `204 No Content`: Booking canceled
- `404 Not Found`: Booking not found

---

## 🔐 Authentication & Authorization

- **Authenticate**: Send a JWT token via `Authorization` header
  ```http
  Authorization: Bearer <token>
  ```
- **Authorize**: Only admins can create/update/delete hotels

---

## 🧪 Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden (no access) |
| 404  | Not Found             |
| 500  | Internal Server Error |

---


