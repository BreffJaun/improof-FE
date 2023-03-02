const toastOptions = {
  theme: theme,
  hideProgressBar: "true",
  icon: () => (
    <img
      src={
        color === "c-PI1"
          ? logoPi
          : color === "c-O2"
          ? logoOr
          : color === "c-PU1"
          ? logoPu
          : color === "c-B2"
          ? logoBl
          : color === "c-LB2"
          ? logoLB
          : color === "c-GR1"
          ? logoLG
          : color === "c-GR3"
          ? logoGR
          : logoDG
      }
      width="20"
    />
  ),
};
