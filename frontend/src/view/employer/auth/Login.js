import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authApi from "../../../api/auth";
import employerApi from "../../../api/employer";
import { employerAuthActions } from "../../../redux/slices/employerAuthSlice";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const required_mark = <span className="text-danger"> *</span>;
  const required_error = (
    <div className="text-danger text-start small">Vui lòng nhập thông tin!</div>
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isView, setIsView] = useState(false);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (inf) => {
    inf.role = 2;
    setIsLoading(true);
    try {
      const res = await authApi.login(inf);
      localStorage.setItem("employer_jwt", res.authorization.token);
      toast.success("Đăng nhập thành công!");

      // Lấy thông tin nhà tuyển dụng (bao gồm công ty)
      const employerInfo = await authApi.getMe(2);
      dispatch(employerAuthActions.setUser(employerInfo));

      // Lấy thông tin công ty từ API
      const companyRes = await employerApi.getById(employerInfo.id);
      localStorage.setItem(
        "companyInfo",
        JSON.stringify({
          id: companyRes.id,
          name: companyRes.name,
          logo: companyRes.logo,
          phone: companyRes.phone,
          address: companyRes.address,
          link: `/company/${companyRes.id}`,
        })
      );

      nav("/employer");
    } catch (error) {
      setMsg("Email hoặc mật khẩu không chính xác!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("employer_jwt")) {
      nav("/employer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-container mx-auto p-4">
      <form
        className="login-form border px-4 py-4 rounded shadow-lg animate__animated animate__fadeIn"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="mb-4 text-center login-title">Nhà tuyển dụng đăng nhập</h4>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <AiOutlineMail className="me-2 text-primary" />Email{required_mark}
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
        <div className="form-group mt-3">
          <label htmlFor="passwd" className="form-label">
            <AiOutlineLock className="me-2 text-primary" />Mật khẩu{required_mark}
          </label>
          <div className="input-group">
            <input
              type={isView ? "text" : "password"}
              className="form-control border-end-0"
              name="passwd"
              placeholder="Nhập mật khẩu..."
              {...register("password", { required: true })}
            />
            <span
              className="input-group-text border-start-0 bg-white text-secondary icon-eye"
              onClick={() => setIsView(!isView)}
            >
              {isView ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>
          {errors.password && required_error}
        </div>
        {msg && <div className="text-danger text-center mt-3">{msg}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-3 login-btn">
          Đăng nhập
          {isLoading && <div className="spinner-border spinner-border-sm ms-2"></div>}
        </button>
        <div className="mt-3 text-center">
          <Link to={`#`} className="text-decoration-none text-primary">
            Quên mật khẩu
          </Link>
        </div>
        <hr />
      </form>
    </div>
  );
}

export default Login;
