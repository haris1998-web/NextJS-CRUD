import { Item } from "@/lib/types";

interface Props {
    items: Item[];
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

export default function ItemTable({ items, onEdit, onDelete }: Props) {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-b">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.description}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2 space-x-2">
                            <button onClick={() => onEdit(item)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}