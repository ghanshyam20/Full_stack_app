import { useState } from "react";

// This form is used for both adding new destinations and editing existing ones
export default function DestinationForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send , yesle data pathauna lai tayari vayera basxa 
    const formData = {
      name,
      description,
      price,
      imageUrl,
    };

    onSave(formData); // send to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-5 rounded shadow mb-6"
    >
      <h2 className="text-xl font-bold mb-3">
        {initialData ? "Edit Destination" : "Add New Destination"}
      </h2>

      <input
        type="text"
        placeholder="Destination Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <div className="flex gap-4 mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
