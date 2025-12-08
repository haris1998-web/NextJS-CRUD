"use client";

import { useEffect, useState } from "react";
import { Item } from "@/lib/types";
import ItemForm from "@/components/ItemForm";
import ItemTable from "@/components/ItemTables";


export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchItems = async () => {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data);
    }

    const handleAdd = async (data: Omit<Item, "id" | "createdAt">) => {
        await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        fetchItems();
        setShowForm(false);
    }

    const handleUpdate = async(data: Omit<Item, "id" | "createdAt">) => {
        await fetch("/api/items", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: editingItem?.id, ...data }),
        });
        fetchItems();
        setEditingItem(null);
        setShowForm(false);
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        await fetch("/api/items", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id }),
        });
        fetchItems();
    }

    useEffect(() => {
        fetchItems();
        console.log(items);
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Inventory Manager</h1>

            {!showForm && ( 
                <button 
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
                    onClick={() => setShowForm(true)}
                >
                    Add Item
                </button>
            )}

            {showForm && (
                <ItemForm 
                    initialData={editingItem ?? undefined}
                    onSubmit={editingItem ? handleUpdate : handleAdd}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                />
            )}

            <ItemTable items={items} onEdit={(item) => {setEditingItem(item); setShowForm(true);}} onDelete={handleDelete}/>
        </div>
    );
}