"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "./registerSchema";
import styles from "./page.module.scss";
import Link from "next/link";
import Buttons from "../components/Buttons/Buttons";

type Inputs = {
  Name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="logo" className={styles.logoImage} />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Registration</h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
              <label htmlFor="Name" className={styles.formLabel}>
              Name
              </label>
              <input
                {...register("Name")}
                className={styles.formInput}
                type="Name"
                id="Name"
                name="Name"
                placeholder="enter your email"
              />
              {errors.Name && (
                <span className={styles.errorMessage}>
                  {errors.Name.message}
                </span>
              )}
            </div>
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

            <div className={styles.passwordGroup}>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  Pasword
                </label>
                <input
                  {...register("password")}
                  className={styles.formInputPassword}
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

              <div className={styles.formGroup}>
                <label htmlFor="passwordConfirm" className={styles.formLabel}>
                  Confirm Password
                </label>
                <input
                  {...register("passwordConfirm")}
                  className={styles.formInputPassword}
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="confirm your password"
                />
                {errors.passwordConfirm && (
                  <span className={styles.errorMessage}>
                    {errors.passwordConfirm.message}
                  </span>
                )}
              </div>

            </div>

           
            <Buttons title="Register" type="submit" className="primary"/>

            <Link href="/login" className={styles.formLink}>
              Already have an account?{" "}
              <span className={styles.formLinkSpan}>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
