import { Item } from "@/lib/types";
import { on } from "events";
import { useState } from "react";

interface Props {
    initialData?: Item;
    onSubmit: (data: {name: string, description?: string, quantity: number}) => void;
    onCancel: () => void;
}

export default function ItemForm({initialData, onSubmit, onCancel}: Props) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [quantity, setQuantity] = useState(initialData?.quantity || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, quantity });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
            <div>
                <label className="block">Name</label>
                <input 
                    className="border p-1 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label className="block">Description</label>
                <input 
                    className="border p-1 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label className="block">Quantity</label>
                <input
                    className="border p-1 w-full"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>
            <div className="space-x-2">
                <button 
                    className="bg-green-500 text-white px-3 py-1 rounded" 
                    type="submit"
                    >
                    {initialData ? "Update" : "Create"}
                </button>
                <button 
                    className="bg-gray-500 text-white px-3 py-1 rounded" 
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}