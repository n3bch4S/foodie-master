export type Food = {
  id: string;
  name: string;
  category: string;
  price: number;
  url?: string;
};

export async function fetchFood(): Promise<Food[]> {
  return [
    {
      id: "1",
      name: "โจ๊ก",
      category: "จานหลัก",
      price: 50,
      url: "https://www.centralworld.co.th/storage/stores/K/kfc.jpg",
    },
    { id: "2", name: "กะเพรา", category: "จานหลัก", price: 59 },
    { id: "3", name: "ก๋วยเตี๋ยว", category: "จานหลัก", price: 55 },
    { id: "4", name: "บะหมี่", category: "จานหลัก", price: 55 },
    { id: "5", name: "หมูกรอบ", category: "จานรอง", price: 129 },
    { id: "6", name: "เล้ง", category: "จานรอง", price: 199 },
    { id: "7", name: "ส้มตำ", category: "จานหลัก", price: 59 },
    { id: "8", name: "ปอเปี๊ยะทอด", category: "ของว่าง", price: 199 },
    { id: "9", name: "ไก่ย่าง", category: "กับข้าว", price: 79 },
    { id: "10", name: "ข้าวเหนียว", category: "อื่นๆ", price: 10 },
    { id: "11", name: "น้ำเปล่า", category: "เครื่องดื่ม", price: 15 },
  ];
}

export async function deleteFood(id: string): Promise<void> {
  console.log(`Delete food '${id}' succussfully`);
}
