function About() {
  return (
    <>
      <h1 style={{ marginBottom: 7 }}>How does the site function? </h1>
      <small style={{ float: "left", color: "#888" }}>2023 Feb 28 </small>
      <small style={{ float: "left", color: "#888" }}></small>
      <br></br>
      <title>Some personal user experiences </title>
      <p>
        <strong>In 2013</strong>, I went to a sushi restaurant beside the{" "}
        <a href="https://archive.org/about/contact.php">
          Internet Archive in San Francisco
        </a>
        , because I had heard that it accepted bitcoin for payments and I wanted
        to try it out. When it came time to pay the bill, I asked to pay in BTC.
        I scanned the QR code, and clicked "send". To my surprise, the
        transaction did not go through; it appeared to have been sent, but the
        restaurant was not receiving it. I tried again, still no luck. I soon
        figured out that the problem was that my mobile internet was not working
        well at the time. I had to walk over 50 meters toward the Internet
        Archive nearby to access its wifi, which finally allowed me to send the
        transaction.
        <code> django view xx.ss @api-view</code>
      </p>
      <p>
        <strong>Lesson learned</strong>: internet is not 100% reliable, and
        customer internet is less reliable than merchant internet. We need
        in-person payment systems to have <em>some</em>
        functionality (NFC, customer shows a QR code, whatever) to allow
        customers to transfer their transaction data directly to the merchant if
        that's the best way to get it broadcasted.
      </p>
      <p>
        <strong>In 2021</strong>, I attempted to pay for tea for myself and my
        friends at a coffee shop in Argentina. In their defense, they did not{" "}
        <em>intentionally</em>
        accept cryptocurrency: the owner simply recognized me, and showed me
        that he had an account at a cryptocurrency exchange, so I suggested to
        pay in ETH (using cryptocurrency exchange accounts as wallets is a
        standard way to do in-person payments in Latin America). Unfortunately,
        my first transaction of 0.003 ETH did not get accepted, probably because
        it was under the exchange's 0.01 ETH deposit minimum. I sent another
        0.007 ETH. Soon, both got confirmed. (I did not mind the 3x overpayment
        and treated it as a tip).
      </p>
      <p>
        <strong>In 2022</strong>, I attempted to pay for tea at a different
        location. The first transaction failed, because the default transaction
        from my mobile wallet sent with only 21000 gas, and the receiving
        account was a contract that required extra gas to process the transfer.
        Attempts to send a second transaction failed, because a UI glitch in my
        phone wallet made it not possible to scroll down and edit the field that
        contained the gas limit.
      </p>
      <p>
        <strong>Lesson learned</strong>: simple-and-robust UIs are better than
        fancy-and-sleek ones. But also, most users don't even know what gas
        limits are, so we really just need to have better defaults.
      </p>
      <p>
        <strong>Many times</strong>, there has been a surprisingly long time
        delay between my transaction getting accepted on-chain, and the service
        acknowledging the transaction, even as "unconfirmed". Some of those
        times, I definitely got worried that there was some glitch with the
        payment system on their side.
      </p>
      <p>
        <strong>Many times</strong>, there has been a surprisingly long and
        unpredictable time delay between sending a transaction, and that
        transaction getting accepted in a block. Sometimes, a transaction would
        get accepted in a few seconds, but other times, it would take minutes or
        even hours. Recently,{" "}
        <a href="https://notes.ethereum.org/@vbuterin/eip-1559-faq">EIP-1559</a>
        significantly improved this, ensuring that most transactions get
        accepted into the next block, and even more recently the Merge improved
        things further by stabilizing block times.
      </p>
      <center>
        <p>
          <img src="../../../../images/ux/diagram.png" />
        </p>
        <p></p>
        <p>
          <em>
            Diagram from{" "}
            <a href="https://decentralizedthoughts.github.io/2022-03-10-eip1559/">
              this report by Yinhong (William) Zhao and Kartik Nayak
            </a>
            .
          </em>
        </p>
      </center>
    </>
  );
}

export default About;
