"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeComponent() {
  const menu = [
    {
      name: "QR Code Generator",
      href: "/qr-code-generator",
      date: "2026-03-05",
      description: "Generate QR codes for URLs, text, and more.",
      deskripsi: "Buat QR code untuk URL, teks, dan lainnya.",
      keywords: [
        "qr code",
        "generator",
        "qr code generator",
        "qr code maker",
        "qrcode",
      ],
    },
    {
      name: "QR Code Scanner",
      href: "/qr-code-scanner",
      date: "2026-03-05",
      description: "Scan QR codes and extract the information they contain.",
      deskripsi:
        "Pindai QR code dan ekstrak informasi yang terkandung di dalamnya.",
      keywords: [
        "qr code",
        "scanner",
        "qr code scanner",
        "qr code reader",
        "qrcode",
      ],
    },
    {
      name: "URL Shortener",
      href: "/url-shortener",
      date: "2026-03-05",
      description: "Shorten long URLs for easier sharing.",
      deskripsi: "Pendekkan URL panjang untuk berbagi yang lebih mudah.",
      keywords: ["url", "shortener", "url shortener", "link shortener"],
    },
    {
      name: "Percentage Calculator",
      href: "/percentage-calculator",
      date: "2026-03-05",
      description: "Calculate percentages for various scenarios.",
      deskripsi: "Hitung persentase untuk berbagai skenario.",
      keywords: ["percentage", "calculator", "percent calculator"],
    },
    {
      name: "Split Bill Calculator",
      href: "/split-bill-calculator",
      date: "2026-03-05",
      description: "Easily split bills among friends and family.",
      deskripsi: "Mudah membagi tagihan di antara teman dan keluarga.",
      keywords: ["split bill", "calculator", "bill splitter"],
    },
  ];

  const [searchedMenu, setSearchedMenu] = useState(menu);
  const [sortOption, setSortOption] = useState("az");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("search") || "";
    const filteredMenu = menu.filter((tool) =>
      tool.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setSearchedMenu(filteredMenu);
  }, []);

  function sortMenu(sortOption: string) {
    let sortedMenu = [...searchedMenu];
    if (sortOption === "az") {
      sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      sortedMenu.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "old") {
      sortedMenu.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortOption === "new") {
      sortedMenu.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    setSearchedMenu(sortedMenu);
    setSortOption(sortOption);
  }

  return (
    // mobile view
    <div className="flex flex-col items-center justify-center py-2">
      {/* logo */}
      <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      <div className="text-center mt-4">
        <h1 className="text-4xl font-bold mb-4">Alatnya Gweh</h1>
        <p className="text-lg text-gray-600">
          Kumpulan Alat Digital yang memudahkan pekerjaan kita.
        </p>
      </div>
      {/* tools */}
      <div className="w-full max-w-4xl px-4 mt-8">
        {/* title */}
        <h2 className="text-2xl font-bold mb-4">Alat yang Tersedia</h2>
        {/* search bar & sort button */}
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Cari alat..."
            className="flex-1 mr-4 w-full"
            onChange={(e) => {
              const query = e.target.value;
              const filteredMenu = menu.filter((tool) =>
                tool.keywords.some((keyword) =>
                  keyword.toLowerCase().includes(query.toLowerCase()),
                ),
              );
              setSearchedMenu(filteredMenu);
            }}
          />
          <Select
            onValueChange={(value) => {
              sortMenu(value);
            }}
            defaultValue="az"
          >
            <SelectTrigger className="w-auto">
              {sortOption === "az" ? (
                <ArrowDownAZ className="mr-2" />
              ) : sortOption === "za" ? (
                <ArrowDownZA className="mr-2" />
              ) : sortOption === "old" ? (
                <CalendarArrowUp className="mr-2" />
              ) : (
                <CalendarArrowDown className="mr-2" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by:</SelectLabel>
                <SelectItem value="az">
                  <ArrowDownAZ className="mr-2" /> A-Z
                </SelectItem>
                <SelectItem value="za">
                  <ArrowDownZA className="mr-2" /> Z-A
                </SelectItem>
                <SelectItem value="old">
                  <CalendarArrowUp className="mr-2" /> Terlama
                </SelectItem>
                <SelectItem value="new">
                  <CalendarArrowDown className="mr-2" /> Terbaru
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {
            // tool card
            searchedMenu.map((tool) => (
              <Card
                key={tool.href}
                className="p-4 bg-background transition-colors hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>

                {/* Buka button full */}
                <div className="flex items-center gap-2">
                  <Button className="w-full" asChild>
                    <Link href={tool.href}>Buka</Link>
                  </Button>
                  <Button className="" asChild>
                    <Link href={tool.href}>
                      <Share className="" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))
          }
        </div>

        {/* Punya Ide? */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Punya ide alat digital yang ingin kamu butuhkan?{" "}
            <Link href="/submit" className="text-blue-500 hover:underline">
              Kasih tau aku ya!
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 py-6 border-t">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Alatnya Gweh. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
