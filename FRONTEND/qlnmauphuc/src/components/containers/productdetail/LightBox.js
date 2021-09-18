import { SRLWrapper } from "simple-react-lightbox";
// USE THE IMPORT BELOW INSTEAD IF YOU ARE USING THE PRO VERSION
// import { SRLWrapper } from 'simple-react-lightbox-pro'

// import Image from "next/image"; // This is the NextJS image component that sometime is not recognized

function MyComponent() {
  return (
    <SRLWrapper>
      <a href="./images/Banner/banner-ao-vest-1024x361.jpg">
        <img src="./images/Banner/banner-ao-vest-1024x361.jpg" alt="Umbrella" />
      </a>
      <a href="./images/Banner/aegis-ddr4-banner.jpg">
        <img src="./images/Banner/aegis-ddr4-banner.jpg" alt="Blue sky" />
      </a>
    </SRLWrapper>
  );
}

export default MyComponent;
