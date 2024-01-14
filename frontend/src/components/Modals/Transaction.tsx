"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SVG } from "@/assets/SVG";
import { leagueGothic } from "@/font/font";
import { useSelector } from "@/store";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";

interface TransactionProps {
  handleCloseModal: () => void;
  startDate: string;
  endDate: string;
}

function Transaction({
  handleCloseModal,
  startDate,
  endDate,
}: TransactionProps) {
  const authState = useSelector((state: any) => state.auth.userData) || [];
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDateTime = new Date(startDate);
        startDateTime.setHours(0, 0, 0, 0);

        const endDateTime = new Date(endDate);
        endDateTime.setHours(0, 0, 0, 0);

        const filteredCoins = authState?.coins?.filter((coin: any) => {
          const coinDateTime = new Date(coin.date);
          coinDateTime.setHours(0, 0, 0, 0);

          return coinDateTime >= startDateTime && coinDateTime <= endDateTime;
        });

        setFilteredCoins(filteredCoins);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authState, startDate, endDate]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-container sm:w-96 lg:w-4/12 mx-auto z-50 overflow-y-auto">
          <div className="relative text-center rounded-lg bg-[#091619] p-3 sm:p-6 border border-[#586769]">
            <button
              type="button"
              className="text-white-400 absolute top-3.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={handleCloseModal}
            >
              <Image src={SVG.Exit} alt="exit" width={30} height={30} />
              <span className="sr-only">Close modal</span>
            </button>

            <h1
              className={`${leagueGothic.className} text-center text-3xl mb-5 text-white`}
            >
              TRANSACTION HISTORY
            </h1>

            <div className="flex gap-6 p-3 sm:p-3 justify-center w-full rounded-lg overflow-hidden">
              <div>
                <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                  From Date
                </p>
                <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                  {format(new Date(startDate), "dd MMM, yyyy")}
                </p>
              </div>
              <Image
                className="object-contain"
                src={SVG.Arrow}
                alt="Arrow"
                width={30}
                height={30}
              />
              <div>
                <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#787F80]">
                  To Date
                </p>
                <p className="mx-2 sm:mx-4 text-sm font-bold sm:text-base">
                  {format(new Date(endDate), "dd MMM, yyyy")}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full sm:min-h-[350px] lg:min-h-[400px] max-h-[400px] sm:max-h-[350px] lg:max-h-[400px] overflow-y-auto no-scrollbar">
              {filteredCoins.map((coin: any) => (
                <div key={coin._id}>
                  <div className="flex items-center my-3">
                    <Image
                      className="object-contain"
                      src={SVG.CoinsAdd}
                      alt="Coin"
                      width={50}
                      height={50}
                    />
                    <div className="flex items-center justify-between w-full sm:w-full">
                      <div>
                        <p className="flex items-start mx-2 sm:mx-4 text-sm font-light sm:text-base">
                          {coin.coinType}
                        </p>
                        <p className="mx-2 sm:mx-4 text-sm font-light text-left text-[#7C7F80]">
                          {format(
                            new Date(coin?.date),
                            "dd MMM, yyyy - h:mm a"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-white">{coin.coinAmount} Coin</p>
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-[#343434]" />
                </div>
              ))}
            </div>

            <div className="flex items-center w-full my-5">
              {dataFetched &&
                (filteredCoins.length > 0 ? (
                  <PDFDownloadLink
                    document={<TransactionPDF filteredCoins={filteredCoins} />}
                    fileName="transaction_history.pdf"
                    style={{
                      width: "100%",
                      fontSize: "1rem",
                      fontWeight: 600,
                      backgroundColor: "#37C535",
                      padding: "10px",
                      color: "#fff",
                      textAlign: "center",
                      borderTopLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                      borderTopRightRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                ) : (
                  <p>No data available for the selected date range.</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const TransactionPDF = ({ filteredCoins }: { filteredCoins: any[] }) => (
  <Document>
    <Page size="A4">
      <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
        Transaction History
      </Text>
      {filteredCoins.map((coin: any) => (
        <View key={coin._id}>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>
            {`${coin.coinType} - ${coin.coinAmount} Coin - ${format(
              new Date(coin?.date),
              "dd MMM, yyyy - h:mm a"
            )}`}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default Transaction;
