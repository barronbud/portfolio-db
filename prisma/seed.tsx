import { PrismaClient } from "@prisma/client";
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
                address: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state({ abbreviated: true }),
                zip: faker.location.zipCode(),
                phone: faker.phone.number(),
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
                price: Math.round(
                    parseFloat(faker.commerce.price({ min: 10, max: 1000 })) *
                        100
                ),
                stock: faker.number.int({ min: 0, max: 1000 }),
                sku: faker.commerce.isbn(),
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
            const price = parseInt(product.price.toString());

            orderItems.push({
                productId: product.id,
                quantity: quantity,
                price: price,
            });

            total += price * quantity;
        }
        const shipping = Math.round(
            faker.number.float({
                min: 0,
                max: 10,
                fractionDigits: 2,
            }) * 100
        );
        const tax = Math.round(
            faker.number.float({ min: 0, max: 10, fractionDigits: 2 }) * 100
        );
        total += shipping + tax;

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
                shipping: shipping,
                tax: tax,
                total: total,
                orderItems: {
                    create: orderItems,
                },
            },
        });
    }

    // Create 10 users
    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = await prisma.ledger_User.create({
            data: {
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
            },
        });
        users.push(user);
    }

    // Create 10 merchants
    const merchants = [];
    for (let i = 0; i < 10; i++) {
        const merchant = await prisma.ledger_Merchant.create({
            data: {
                name: faker.company.name(),
            },
        });
        merchants.push(merchant);
    }

    // Create 10 categories
    const categories = [];
    for (let i = 0; i < 10; i++) {
        const category = await prisma.ledger_Category.create({
            data: {
                name: faker.commerce.department(),
            },
        });
        categories.push(category);
    }

    // Create 100 transactions
    for (let i = 0; i < 100; i++) {
        const transaction = await prisma.ledger_Transaction.create({
            data: {
                amount: faker.number.int({ min: 100, max: 1000 }),
                date: faker.date.recent(),
                merchantId: faker.helpers.arrayElement(merchants).id,
                categoryId: faker.helpers.arrayElement(categories).id,
                userId: faker.helpers.arrayElement(users).id,
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
