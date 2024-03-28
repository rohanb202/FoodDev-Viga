# Delivery Pricing API Documentation

## Introduction

The Delivery Pricing API provides endpoints to manage and calculate delivery prices for different types of food items across various zones. It allows users to create, retrieve, update, delete, and calculate pricing information for organizations based on their specific requirements.

## Tech Stack

- **Node.js**: Runtime environment for executing JavaScript code.
- **Express.js**: Web application framework for building RESTful APIs.
- **PostgreSQL**: Relational database management system for data storage.
- **pg**: PostgreSQL client for Node.js to interact with the database.
- **Postman**: API development environment for testing endpoints.

## API Routes

| Route                      | Method | Description                                           | Request Format                                              | Response Format                                           |
|----------------------------|--------|-------------------------------------------------------|-------------------------------------------------------------|------------------------------------------------------------|
| `/items`                   | GET    | Retrieve all items available for delivery             | No request parameters needed                                | Array of item objects                                     |
| `/items`                   | POST   | Create a new item for delivery                        | JSON: `{ "type": "perishable", "description": "Organic apples" }` | Newly created item object                                 |
| `/items/:id`               | DELETE | Delete an item with the specified ID                  | No request body needed                                      | JSON: `{ "message": "Item deleted successfully" }`         |
| `/organizations`           | GET    | Retrieve all organizations with their pricing structures | No request parameters needed                                | Array of organization objects                             |
| `/organizations`           | POST   | Create a new organization                             | JSON: `{ "name": "Fresh Mart" }`                           | Newly created organization object                         |
| `/organizations/:id`       | DELETE | Delete an organization with the specified ID           | No request body needed                                      | JSON: `{ "message": "Organization deleted successfully" }` |
| `/pricing`                 | GET    | Retrieve pricing details for all organizations         | No request parameters needed                                | Array of pricing objects                                  |
| `/pricing`                 | POST   | Create pricing details for an organization            | JSON: `{ "organization_id": 1, "item_id": 5, "zone": "central", "base_distance_in_km": 5, "base_price_in_cents": 1200, "km_price_in_cents": 200 }` | Newly created pricing object                             |
| `/pricing/:id`             | DELETE | Delete pricing details with the specified ID           | No request body needed                                      | JSON: `{ "message": "Pricing deleted successfully" }`     |
| `/calculatePrice`          | POST   | Calculate delivery price for a specific item and zone | JSON: `{ "zone": "central", "organization_id": 1, "total_distance": 12, "item_id": 5 }` | JSON: `{ "total_price": 24.5 }`                           |
| `/pricing/:orgId/:itemId`  | GET    | Retrieve pricing details by organization ID and item ID | No request parameters needed                                | Pricing details object                                    |

**Note:** The API has robust error handling and returns proper error information in JSON format. In case of errors, appropriate HTTP status codes are returned along with descriptive error messages in JSON format. This ensures clear communication of errors and facilitates easier debugging and troubleshooting.

## Conclusion

The Delivery Pricing API provides a convenient way to manage and calculate delivery prices for various food items. By utilizing the provided endpoints, users can easily create, retrieve, update, delete, and calculate pricing information for organizations, ensuring accurate and efficient delivery cost calculations.

**Note:** While this API provides basic functionality, it could be further improved by adding user authentication and authorization mechanisms, allowing only administrators to access certain routes. This would enhance security and control over the application's data and functionalities.
