import React from "react";
import styles from "./Landing.module.css";
import { Container } from "@mui/material";

const Landing = () => {
  return (
    <>
      <Container maxWidth="2xl" className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.heading}>
            <b>Welcome to the Varthana Page</b>
          </span>
          <p className={styles.subheading}>
            We Provide Loans to Schools and Students
          </p>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <p className={styles.sectionContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.sectionContent}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </Container>
      <div className={styles.footer}>
        <p>Varthana © 2024. All rights reserved.</p>
      </div>
    </>
  );
};

export default Landing;
