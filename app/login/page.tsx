"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./page.module.scss";
import Link from "next/link";
import { userSchema } from "./loginSchema";

type Inputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(userSchema as any),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="logo" className={styles.logoImage} />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Welcome Back, Login to your account</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
              <input
                {...register("email")}
                className={styles.formInput}
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Pasword
              </label>
              <input
                {...register("password")}
                className={styles.formInput}
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
              />
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>
 

            <button type="submit" className={styles.formButton}>
              Register
            </button>

            <Link href="/register" className={styles.formLink}>
              you don't have an account? <span className={styles.formLinkSpan}>Register</span>
            </Link>
          </form>
      </div>
    </div>
  </section>
);
}