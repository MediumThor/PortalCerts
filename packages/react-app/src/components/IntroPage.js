import React, { useState, useEffect, Fragment } from "react";
import { Button } from "antd";

import acImg from "./ac.png";
import CellsComponent from "./CellsComponent";

function IntroPage(props) {

  const [mintSection, setMintSection] = useState('');
  const [displaySection, setDisplaySection] = useState('');

  const wrongNetworkHTML = <Fragment>You are on the wrong network. Please switch to mainnet on your web3 wallet and refresh the page.</Fragment>;

  const offlineHTML = <Fragment>
    [In order to mint a certificate, you need to  have a web3/Ethereum-enabled browser and connect it (see top right of the page). Please download
    the <a href="https://metamask.io">MetaMask Chrome extension</a> or open in an Ethereum-compatible browser.]
  </Fragment>;

  function mintDefaultAnchorCertificate() {
    props.mintAnchorCertificate('default');
  }

  function mintDeluxeAnchorCertificate() {
    props.mintAnchorCertificate('deluxe');
  }

  useEffect(() => {
    if (typeof props.address !== 'undefined' && props.ACSigner !== null) {
      let disabled = true;
      var unix = Math.round(+new Date() / 1000);
      if (unix >= 1687429140) { disabled = false; }
      const newMintHTML = <Fragment>
        Campaign started on Mon FEB 22 2021  <br />
        <br />
        {props.dfPrice} AVAX (~$20). Available until 22 July . <br />
        <Button size={"small"} disabled={false} loading={props.minting} onClick={mintDefaultAnchorCertificate}>
          Mint Default Certificate.
        </Button>
        <br />
        <br />
        {props.dxPrice} AVAX (~$100). Available until 100 are sold, or until 26 July (sold out!).<br />
        <Button size={"small"} disabled={false} loading={props.minting} onClick={mintDeluxeAnchorCertificate}>
          Mint Deluxe Certificate.
        </Button>
        <br />
        <br />
        By minting, you agree to the <a href="https://github.com/Untitled-Frontier/tlatc/blob/master/TOS_PP.pdf">Terms of Service</a>.
      </Fragment>
      setMintSection(newMintHTML);
    }
  }, [props.address, props.ACSigner, props.minting]);

  useEffect(() => {
    if (props.injectedChainId !== props.hardcodedChainId && props.injectedChainId !== null) {
      setMintSection(wrongNetworkHTML);
    } else if (props.injectedChainId == null) {
      setMintSection(offlineHTML);
    }
  }, [props.hardcodedChainId, props.ACSigner]); // TODO: re-add signer coming in

  useEffect(() => {
    if (props.tokenId !== 0) {
      // new certificate was minted, thus display it.
      setDisplaySection(
        <Fragment>
          <h2>Your Newly Arcanum Portal Certificate! Welcome!</h2>
          <CellsComponent hash={props.tokenId} ACSigner={props.ACSigner} /> <br />
          To interact with the certificate: to view it, to transfer it, and to see other certificates, head to <a href="https://testnets.opensea.io/collection/arcanum-portal-certificates" target="_blank">OpenSea</a>.\ All certificates, however, are recorded
          on the Avalanche blockchain, and viewable in OpenSea.
        </Fragment>
      );
    }
  }, [props.tokenId, props.ACSigner]);

  return (

    <div className="App" style={{ textAlign: "justify" }}>

      <img src={acImg} alt="Anchor Certificates" style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }} /> <br />
      {/* MINT SECTION */}
      <div className="section">
        <h2>[] Mint</h2>
        {mintSection}
      </div>
      <br />
      {displaySection}
      <br />
      <br />
      To view and collect Anchor Certificates from existing collectors, head over to OpenSea. <br />
      <br />
      <a href="https://testnets.opensea.io/collection/arcanum-portal-certificates" target="_blank"><Button>View The Entire Collection on OpenSea</Button></a>
      <br />
      <br />
      <h2>[] Default Portal Certificates</h2>
      Each default certificate is comprised of the following randomly generated features: <br />
      <ul>
        <li>One of 16 colour palettes.</li>
        <li>One of 64 reasons to move back to Arcanum Labs. (eg, to build, to dance, to fly, to sing).</li>
        <li>Variable heights of the skyscraper barcode and changes in the spacing/patterns.</li>
      </ul>
      There was no limit to the available amount of Default Certificates until the end of the campaign date.<br />
      <br />
      <h2>[] Deluxe Certificates</h2>
      Alongside the components of the default certificates, each deluxe certificate contains: <br />
      <ul>
        <li>A different edition title: "DX1" vs "DF1". </li>
        <li>Only a maximum of 100 will exist. </li>
        <li>The buyer's address will forever be etched into the certificate as a sponsor (even when transferred elsewhere). </li>
      </ul>
      The components that make up the certificates are licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. Thus, you are free to use the NFTs as you wish. <a href="https://github.com/Untitled-Frontier/tlatc">The code is available on Github.</a><br />
      <br />

    </div>
  );
}

export default IntroPage
