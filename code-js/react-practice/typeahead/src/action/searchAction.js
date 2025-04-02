"use server";

const baseNouns = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Car" },
    { id: 4, name: "Dog" },
    { id: 5, name: "Elephant" },
    { id: 6, name: "Flower" },
    { id: 7, name: "Mountain" },
    { id: 8, name: "Ocean" },
    { id: 9, name: "Book" },
    { id: 10, name: "Computer" },
    { id: 11, name: "House" },
    { id: 12, name: "Tree" },
    { id: 13, name: "River" },
    { id: 14, name: "City" },
    { id: 15, name: "Phone" },
    { id: 16, name: "Chair" },
    { id: 17, name: "Lamp" },
    { id: 18, name: "Bicycle" },
    { id: 19, name: "Guitar" },
    { id: 20, name: "Coffee" },
    { id: 21, name: "Window" },
    { id: 22, name: "Door" },
    { id: 23, name: "Clock" },
    { id: 24, name: "Mirror" },
];

export async function searchAction(searchTerm) {
    const filteredNouns = baseNouns.filter((noun) =>
        noun.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredNouns;
}