import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authApi from "../../../api/auth";

function EmployerRegister() {
  const required_mark = <span className="text-danger"> *</span>;
  const required_error = (
    <div className="text-danger text-start small">Vui lòng nhập thông tin!</div>
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authApi.registerEmployer(data);
      toast.success("Đăng ký thành công! Bạn có thể đăng nhập.");
    } catch (error) {
      setMsg("Đăng ký thất bại, vui lòng thử lại!");
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto" style={{ marginTop: "150px", width: "50%" }}>
      <form
        className="border px-4 py-3 rounded shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-3 text-center">Đăng ký nhà tuyển dụng</h4>
        <div>
          <label htmlFor="email" className="mb-1">
            Email{required_mark}
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Nhập email..."
            {...register("email", { required: true })}
          />
          {errors.email && required_error}
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="mb-1">
            Password{required_mark}
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Nhập password..."
            {...register("password", { required: true })}
          />
          {errors.password && required_error}
        </div>
        <div className="mt-2">
          <label htmlFor="name" className="mb-1">
            Tên công ty{required_mark}
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nhập tên công ty..."
            {...register("name", { required: true })}
          />
          {errors.name && required_error}
        </div>
        <div className="mt-2">
          <label htmlFor="address" className="mb-1">
            Địa chỉ{required_mark}
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Nhập địa chỉ..."
            {...register("address", { required: true })}
          />
          {errors.address && required_error}
        </div>
        <div className="mt-2">
          <label htmlFor="phone" className="mb-1">
            Số điện thoại{required_mark}
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Nhập số điện thoại..."
            {...register("phone", { required: true })}
          />
          {errors.phone && required_error}
        </div>
        <div className="mt-2">
          <label htmlFor="website" className="mb-1">
            Website công ty
          </label>
          <input
            type="text"
            className="form-control"
            name="website"
            placeholder="Nhập website công ty..."
            {...register("website")}
          />
        </div>
        {msg && <div className="text-danger text-center mt-2">{msg}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Đăng ký
          {isLoading && (
            <div className="spinner-border spinner-border-sm ms-1"></div>
          )}
        </button>
      </form>
    </div>
  );
}

export default EmployerRegister;
