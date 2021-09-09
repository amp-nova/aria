module.exports = {
    categories: [
        {
            id: "1",
            name: "Category 1",
            slug: "category-1",
            children: ["2"],
            products: ["1", "2"],
            parent: null
        },
        {
            id: "2",
            name: "Category 2",
            slug: "category-2",
            products: ["1"],
            parent: "1"
        }
    ],
    products: [
        {
            id: "1",
            sku: 'sku001',
            slug: 'my-product-1',
            name: 'My Product #1',
            categoryIds: ["1", "2"],
            shortDescription: 'Short description',
            longDescription: 'Very long description of My Product 1',
            variants: [
                {
                    id: "1",
                    sku: 'sku001',
                    name: 'My Product #1 SKU',
                    prices: {
                        sale: 10.99,
                        list: 12.99
                    },
                    defaultImage: {
                        url: '/images/myProduct1SkuImage.jpg'
                    },
                    images: [
                        {
                            url: '/images/myProduct1SkuImage.jpg'
                        }
                    ]
                }
            ]
        },
        {
            id: "2",
            sku: 'sku002',
            slug: 'my-product-2',
            name: 'My Product #2',
            shortDescription: 'Short description',
            longDescription: 'Very long description of My Product 2',
            categoryIds: ["1"],
            variants: [
                {
                    id: "1",
                    sku: 'sku002',
                    prices: {
                        sale: 11.99,
                        list: 13.99
                    },
                    defaultImage: {
                        url: '/images/myProduct2SkuImage.jpg'
                    },
                    images: [
                        {
                            url: '/images/myProduct2SkuImage.jpg'
                        }
                    ]
                },
                {
                    id: "2",
                    sku: '0022',
                    prices: {
                        sale: 12.99,
                        list: 14.99
                    },
                    defaultImage: {
                        url: '/images/myProduct2Sku2Image.jpg'
                    },
                    images: [
                        {
                            url: '/images/myProduct2Sku2Image.jpg'
                        }
                    ]
                }
            ]
        }
    ]
};