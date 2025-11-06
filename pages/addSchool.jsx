import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, key === "image" ? value[0] : value);
      });

      await axios.post("/api/addSchool", formData);
      router.push("/showSchools");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Failed to add school.");
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl m-3">
        Provide School Details
      </h1>
      <br />
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          {...register("name", { required: true })}
          placeholder="School Name"
          className="input"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
          className="input"
        />
        {errors.address && <p className="text-red-500">Address is required</p>}

        <input
          {...register("city", { required: true })}
          placeholder="City"
          className="input"
        />
        {errors.city && <p className="text-red-500">City is required</p>}

        <input
          {...register("state", { required: true })}
          placeholder="State"
          className="input"
        />
        {errors.state && <p className="text-red-500">State is required</p>}

        <input
          {...register("contact", {
            required: true,
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Contact must be exactly 10 digits",
            },
          })}
          placeholder="Contact Number"
          className="input"
        />
        {errors.contact && (
          <p className="text-red-500">
            {errors.contact.message || "Contact is required"}
          </p>
        )}

        <input
          {...register("email_id", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email ID"
          className="input"
        />
        {errors.email_id && (
          <p className="text-red-500">
            {errors.email_id.message || "Email is required"}
          </p>
        )}

        <input
          type="file"
          {...register("image", { required: true })}
          accept="image/*"
          className="input"
        />
        {errors.image && <p className="text-red-500">Image is required</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/showSchools")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📋 School List
          </button>
        </div>
      </form>
    </div>
  );
}
