"use client";
import styles from "./page.module.scss";

export default function Register() {
  return (
    <section className={styles.mainContainer}>

      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="logo" className={styles.logoImage} />
        </div>

        <div className={styles.formContainer}>
           <h1 className={styles.formTitle}>Registration</h1>

           <form  className={styles.form}>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input className={styles.formInput}  type="email" id="email" name="email" placeholder="enter your email" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Pasword</label>
              <input className={styles.formInput} type="password" id="password" name="password" placeholder="enter your password" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="passwordConfirm" className={styles.formLabel}>Confirm Password</label>
              <input className={styles.formInput} type="passwordConfirm" id="passwordConfirm" name="passwordConfirm" placeholder="enter your password" />
            </div>

            <button type="button" className={styles.formButton}>Register</button>
           </form>

        </div>
      </div>


    </section>
  );
}
