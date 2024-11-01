import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    // Create 20 users
    const customers = [];
    for (let i = 0; i < 20; i++) {
        const customer = await prisma.oms_Customer.create({
            data: {
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: await hash("password123", 10),
            },
        });
        customers.push(customer);
    }

    // Create 30 products
    const products = [];
    for (let i = 0; i < 30; i++) {
        const product = await prisma.oms_Product.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
                stock: faker.number.int({ min: 0, max: 1000 }),
            },
        });
        products.push(product);
    }

    // Create 50 orders with 1-5 items each
    for (let i = 0; i < 50; i++) {
        const orderItems = [];
        const numItems = faker.number.int({ min: 1, max: 5 });
        let total = 0;

        // Generate order items
        for (let j = 0; j < numItems; j++) {
            const product = faker.helpers.arrayElement(products);
            const quantity = faker.number.int({ min: 1, max: 5 });
            const price = parseFloat(product.price.toString());

            orderItems.push({
                productId: product.id,
                quantity: quantity,
                price: price,
            });

            total += price * quantity;
        }

        // Create the order with its items
        await prisma.oms_Order.create({
            data: {
                customerId: faker.helpers.arrayElement(customers).id,
                status: faker.helpers.arrayElement([
                    "pending",
                    "processing",
                    "completed",
                    "cancelled",
                ]),
                total: total,
                orderItems: {
                    create: orderItems,
                },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
