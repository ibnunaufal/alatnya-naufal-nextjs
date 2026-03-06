"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { CopyPlus, FileX, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  price: number;
  percentage: number;
  priceAfterCalculation: number;
  personId?: string;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface Discount {
  id: string;
  name: string;
  amount: number;
}

interface Person {
  id: string;
  name: string;
}
/**
 * alur
 * 1. tambahin semua barang beserta harganya
 * 2. tambahin semua pengeluaran yang ditanggung bersama, seperti PPN, ongkir, dll.
 * 3. kasih opsi mau dibagi sekalian per orang apa enggak, kalau iya, tambahin nama orangnya, dan pilih pengeluaran apa aja yang ditanggungnya
 * 4. klik tombol hitung, nanti keluar hasil pembagian biaya secara otomatis, dengan rincian siapa bayar berapa, dan total yang harus dibayar setiap orang
 *
 * detail hasil
 * 1. jika opsi dibagi per orang aktif
 *    tampilan per orang, dengan rincian item apa aja yang dia tanggung, pengeluaran bersama apa aja yang dia tanggung, dan total yang harus dia bayar
 * 2. jika tidak
 *    tampilan nama, harga sebelum, harga setelah
 *
 */
export default function SplitBillComponent() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemForm, setItemForm] = useState({ name: "", price: 0 });
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseForm, setExpenseForm] = useState({ name: "", amount: 0 });
  const [splitPerPerson, setSplitPerPerson] = useState(false);
  const [useDiscount, setUseDiscount] = useState(false);
  const [discountForm, setDiscountForm] = useState({ name: "", amount: 0 });
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  let samplePeopleArray: Person[] = [
    {
      id: crypto.randomUUID(),
      name: "Naufal"
    },
  ];

  useEffect(() => {}, []);

  function addNewItem(name: string, price: number) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      name,
      price,
      percentage: 0,
      priceAfterCalculation: 0,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }

  return (
    <div className="">
      {/* title & explanation */}
      <h1 className="text-2xl font-bold mb-4">Split Bill</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Alat ini membantu Anda membagi tagihan dengan mudah. Masukkan nama item
        dan jumlahnya, lalu tambahkan pengeluaran untuk setiap orang. Klik
        tombol hitung untuk melihat pembagian biaya secara otomatis.
      </p>
      {/* card item */}
      <Card className="w-full mb-4">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">Daftar Item</CardTitle>
            <Popover>
              <PopoverTrigger>
                <Button size="sm" variant="noShadow" className="bg-background">
                  Tambah
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" p-4">
                {/* form input item */}
                <div className="flex flex-col gap-4">
                  <p className="text-md font-bold text-muted-foreground">
                    Tambahkan item
                  </p>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Item Name"
                      type="text"
                      value={itemForm.name}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={itemForm.price || ""}
                      onChange={(e) =>
                        setItemForm({
                          ...itemForm,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <PopoverClose asChild>
                    <Button
                      className="px-4 py-2 rounded"
                      onClick={() => {
                        if (itemForm.name && itemForm.price > 0) {
                          addNewItem(itemForm.name, itemForm.price);
                          setItemForm({ name: "", price: 0 });
                        }
                      }}
                    >
                      Add Item
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <p className="text-sm text-muted-foreground">
            Tambahkan semua item yang ingin dibagi.
          </p>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FileX className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Belum ada item ditambahkan
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.personId ? item.personId : "Belum ditambahkan"}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mx-4">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <Button
                    size="icon"
                    variant="noShadow"
                    className="bg-white underline text-black mr-1"
                    onClick={() => {
                      // duplicate item logic here
                      const newItem: Item = {
                        ...item,
                        id: crypto.randomUUID(),
                      };
                      setItems((prevItems) => [...prevItems, newItem]);
                    }}
                  >
                    <CopyPlus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="noShadow"
                    className="bg-white underline text-red-600"
                    onClick={() => {
                      setItems((prevItems) =>
                        prevItems.filter((i) => i.id !== item.id),
                      );
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {/* card expense */}
      <Card className="w-full mb-4">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Pengeluaran Bersama
            </CardTitle>
            <Popover>
              <PopoverTrigger>
                <Button size="sm" variant="noShadow" className="bg-background">
                  Tambah
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" p-4">
                {/* form input item */}
                <div className="flex flex-col gap-4">
                  <p className="text-md font-bold text-muted-foreground">
                    Tambahkan pengeluaran bersama
                  </p>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Item Name"
                      type="text"
                      value={expenseForm.name}
                      onChange={(e) =>
                        setExpenseForm({ ...expenseForm, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={expenseForm.amount || ""}
                      onChange={(e) =>
                        setExpenseForm({
                          ...expenseForm,
                          amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <PopoverClose asChild>
                    <Button
                      className="px-4 py-2 rounded"
                      onClick={() => {
                        if (expenseForm.name && expenseForm.amount > 0) {
                          const newExpense: Expense = {
                            id: crypto.randomUUID(),
                            name: expenseForm.name,
                            amount: expenseForm.amount,
                          };
                          setExpenses((prev) => [...prev, newExpense]);
                          setExpenseForm({ name: "", amount: 0 });
                        }
                      }}
                    >
                      Add Item
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground">
            Tambahkan semua pengeluaran yang ditanggung bersama, seperti PPN,
            ongkir, dll.
          </p>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FileX className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Belum ada pengeluaran ditambahkan
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{expense.name}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mx-4">
                    Rp {expense.amount.toLocaleString("id-ID")}
                  </p>
                  <Button
                    size="sm"
                    className="underline text-red-600"
                    onClick={() => {
                      setExpenses((prevExpenses) =>
                        prevExpenses.filter((e) => e.id !== expense.id),
                      );
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Switch option of discount or not */}
      <div className="flex items-center mb-4 mx-4">
        <Switch
          id="use-discount"
          checked={useDiscount}
          onCheckedChange={setUseDiscount}
          className="mr-2"
        />
        <Label
          htmlFor="use-discount"
          className="font-medium text-muted-foreground"
        >
          Ada diskon?
        </Label>
      </div>
      {useDiscount && (
        <Card className="w-full mb-4">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">Diskon</CardTitle>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size="sm"
                    variant="noShadow"
                    className="bg-background"
                  >
                    Tambah
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-4">
                  {/* form input item */}
                  <div className="flex flex-col gap-4">
                    <p className="text-md font-bold text-muted-foreground">
                      Tambahkan diskon
                    </p>
                    <div className="flex flex-col gap-4">
                      <Input
                        placeholder="Diskon Name"
                        type="text"
                        value={discountForm.name}
                        onChange={(e) =>
                          setDiscountForm({
                            ...discountForm,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Amount"
                        type="number"
                        value={discountForm.amount || ""}
                        onChange={(e) =>
                          setDiscountForm({
                            ...discountForm,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <PopoverClose asChild>
                      <Button
                        className="px-4 py-2 rounded"
                        onClick={() => {
                          if (discountForm.name && discountForm.amount > 0) {
                            // Add discount logic here
                            setDiscounts([
                              ...discounts,
                              { ...discountForm, id: Date.now().toString() },
                            ]);
                            setDiscountForm({ name: "", amount: 0 });
                          }
                        }}
                      >
                        Tambah
                      </Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-sm text-muted-foreground">
              Tambahkan semua diskon yang ingin diterapkan.
            </p>
          </CardHeader>
          <CardContent>
            {discounts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FileX className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Belum ada diskon ditambahkan
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {discount.name}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 mx-4">
                      Rp {discount.amount.toLocaleString("id-ID")}
                    </p>
                    <Button
                      size="sm"
                      className="underline text-red-600"
                      onClick={() => {
                        setDiscounts((prevDiscounts) =>
                          prevDiscounts.filter((d) => d.id !== discount.id),
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Switch option of add person or not */}
      <div className="flex items-center mb-4 mx-4">
        <Switch
          id="add-person"
          className="mr-2"
          checked={splitPerPerson}
          onCheckedChange={setSplitPerPerson}
        />
        <Label
          htmlFor="add-person"
          className="font-medium text-muted-foreground"
        >
          Sekalian dibagi per orang bayar berapa?
        </Label>
      </div>
      {/* card people */}
      {splitPerPerson && (
        <Card className="w-full mb-4">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold">People</CardTitle>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size="sm"
                    variant="noShadow"
                    className="bg-background"
                  >
                    Tambah
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-4">
                  {/* form input item */}
                  <div className="flex flex-col gap-4">
                    <p className="text-md font-bold text-muted-foreground">
                      Tambahkan orang
                    </p>
                    <div className="flex flex-col gap-4">
                      <Input
                        placeholder="Nama Orang"
                        type="text"
                        value={discountForm.name}
                        onChange={(e) =>
                          setDiscountForm({
                            ...discountForm,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Amount"
                        type="number"
                        value={discountForm.amount || ""}
                        onChange={(e) =>
                          setDiscountForm({
                            ...discountForm,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <PopoverClose asChild>
                      <Button
                        className="px-4 py-2 rounded"
                        onClick={() => {
                          if (discountForm.name && discountForm.amount > 0) {
                            // Add discount logic here
                            setDiscounts([
                              ...discounts,
                              { ...discountForm, id: Date.now().toString() },
                            ]);
                            setDiscountForm({ name: "", amount: 0 });
                          }
                        }}
                      >
                        Tambah
                      </Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-sm text-muted-foreground">
              Tambahkan semua diskon yang ingin diterapkan.
            </p>
          </CardHeader>
          <CardContent>
            {discounts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <FileX className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Belum ada diskon ditambahkan
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {discounts.map((discount) => (
                  <div
                    key={discount.id}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {discount.name}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 mx-4">
                      Rp {discount.amount.toLocaleString("id-ID")}
                    </p>
                    <Button
                      size="sm"
                      className="underline text-red-600"
                      onClick={() => {
                        setDiscounts((prevDiscounts) =>
                          prevDiscounts.filter((d) => d.id !== discount.id),
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {/* Button Hitung */}
      <div className="text-center">
        <Button className="w-full md:w-fit">Hitung</Button>
      </div>
      {/* card result */}
    </div>
  );
}
