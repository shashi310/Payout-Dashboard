import React, { useState } from "react";
// import XLSX from 'xlsx';
import * as XLSX from "xlsx";
import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FaDownload,
  FaSort,
  FaChevronDown,
  FaSearch,
  FaUserCheck,
  FaWallet,
  FaHome,
  FaBox,
  FaTruck,
  FaMoneyCheckAlt,
  FaUserFriends,
  FaPalette,
  FaCogs,
  FaChartBar,
  FaMoneyBillAlt,
  FaCube,
  FaCaretDown,
  FaEdit,
  FaRegQuestionCircle,
} from "react-icons/fa";

const Dashboard = () => {
  const [month, setMonth] = useState("This Month");

  const ordersData = [
    {
      orderId: "12345",
      status: "success",
      transactionId: "67890",
      refundDate: "2023-12-15",
      orderAmount: "200",
    },
    {
      orderId: "67890",
      status: "processing",
      transactionId: "54321",
      refundDate: "2023-12-14",
      orderAmount: "150",
    },
    {
      orderId: "24680",
      status: "success",
      transactionId: "13579",
      refundDate: "2023-12-13",
      orderAmount: "300",
    },
    {
      orderId: "97531",
      status: "processing",
      transactionId: "24680",
      refundDate: "2023-12-11",
      orderAmount: "250",
    },
    {
      orderId: "11111",
      status: "success",
      transactionId: "22222",
      refundDate: "2023-12-10",
      orderAmount: "280",
    },
    {
      orderId: "55555",
      status: "processing",
      transactionId: "66666",
      refundDate: "2023-12-08",
      orderAmount: "320",
    },
    {
      orderId: "77777",
      status: "success",
      transactionId: "88888",
      refundDate: "2023-12-07",
      orderAmount: "180",
    },
    {
      orderId: "99999",
      status: "processing",
      transactionId: "00000",
      refundDate: "2023-12-05",
      orderAmount: "270",
    },
    {
      orderId: "44444",
      status: "success",
      transactionId: "33333",
      refundDate: "2023-12-04",
      orderAmount: "350",
    },
    {
      orderId: "66666",
      status: "processing",
      transactionId: "77777",
      refundDate: "2023-12-02",
      orderAmount: "400",
    },
  ];

  // calculating the total amount
  const calculateAmounts = (ordersData) => {
    let totalAmount = 0;
    let pendingAmount = 0;
    let payoutAmount = 0;

    ordersData.forEach((order) => {
      const orderAmount = parseFloat(order.orderAmount);

      // Calculate total amount
      totalAmount += orderAmount;

      // Check for pending and payout amounts based on the status
      if (order.status === "success") {
        payoutAmount += orderAmount;
      } else {
        pendingAmount += orderAmount;
      }
    });

    return {
      totalAmount,
      pendingAmount,
      payoutAmount,
    };
  };

  // Calculate amounts based on ordersData
  const { totalAmount, pendingAmount, payoutAmount } =
    calculateAmounts(ordersData);

  const [data, setData] = useState(ordersData);
  const filteredPayouts = ordersData.filter(
    (order) => order.status === "success"
  );
  const filteredRefunds = ordersData.filter(
    (order) => order.status === "processing"
  );
  const payouts = filteredPayouts.length;
  const refunds = filteredRefunds.length;

  const [isPayoutActive, setIsPayoutActive] = useState(false);
  const [isRefundActive, setIsRefundActive] = useState(false);
  const [bgcl, setbgcl] = useState(false);
  const handlePayout = () => {
    setbgcl(true);
    setIsPayoutActive(true);
    setIsRefundActive(false);
    setData(filteredPayouts);
  };
  const handleRefund = () => {
    setIsRefundActive(true);
    setIsPayoutActive(false);
    setbgcl(true);
    setData(filteredRefunds);
  };
  const handleReset = () => {
    setIsPayoutActive(false);
    setIsRefundActive(false);
    setbgcl(false);
    setData(ordersData);
  };

  // seaching and sorting
  const [searchTerm, setSearchTerm] = useState("");
  // const [sortByDate, setSortByDate] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);
    const filteredData = ordersData.filter(
      (order) =>
        order.orderId.toLowerCase().includes(searchText) ||
        order.transactionId.toLowerCase().includes(searchText)
    );
    setData(filteredData);
  };

  const handleSortByDate = () => {
    setbgcl(true);
    // const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseFloat(a.orderAmount.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.orderAmount.replace(/[^0-9.-]+/g, ""));
      return sortByPrice ? priceA - priceB : priceB - priceA;
    });
    // setSortByDate(!sortByDate);
    setSortByPrice(!sortByPrice);
    setData(sortedData);
  };

  // downlaod data text
  const downloadData1 = () => {
    const dataToDownload = data.map(
      (order) =>
        `Order ID: ${order.orderId}, Status: ${order.status}, Transaction ID: ${order.transactionId}, Refund Date: ${order.refundDate}, Order Amount: ${order.orderAmount}\n`
    );
    const formattedData = dataToDownload.join("");
    const blob = new Blob([formattedData], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.txt";
    link.click();
  };

  // downlaod data html
  const downloadData2 = () => {
    const dataToDownload = data.map(
      (order) =>
        `<strong>Order ID:</strong> ${order.orderId}<br><strong>Status:</strong> ${order.status}<br><strong>Transaction ID:</strong> ${order.transactionId}<br><strong>Refund Date:</strong> ${order.refundDate}<br><strong>Order Amount:</strong> ${order.orderAmount}<br><br>`
    );
    const formattedData = `<html><head><title>Data</title></head><body>${dataToDownload.join(
      ""
    )}</body></html>`;
    const blob = new Blob([formattedData], { type: "text/html" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.html";
    link.click();
  };

  // downlaod data xml
  const downloadData3 = () => {
    const formattedData = data.map((order) => ({
      "Order ID": order.orderId,
      Status: order.status,
      "Transaction ID": order.transactionId,
      "Refund Date": order.refundDate,
      "Order Amount": order.orderAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "data.xlsx");
  };

  const iconStyles = {
    marginRight: "12px",
  };

  return (
    <Flex>
      {/* Sidebar */}
      <Box
        w="18%"
        h="100vh"
        position="fixed"
        overflowY="auto"
        bg="#1E2640"
        p="4"
        color="white"
      >
        {/* User profile */}
        <Flex align="center" mb="4">
          <Box mr="2">
            {" "}
            <FaUserCheck />
          </Box>
          <Box>Shashikant Yadav</Box>
          {/* Dropdown menu */}
          <Menu>
            <MenuButton as={Box} ml="2">
              <FaChevronDown />
            </MenuButton>
            <MenuList color="black">
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={RouterLink} to="/store">
                Store
              </MenuItem>
              <MenuItem as={RouterLink} to="/logout">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {/* Sidebar links */}

        <Box>
          <Link
            as={RouterLink}
            to="/home"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaHome style={iconStyles} />
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/orders"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaBox style={iconStyles} />
            Orders
          </Link>
          <Link
            as={RouterLink}
            to="/products"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaCube style={iconStyles} />
            Products
          </Link>
          <Link
            as={RouterLink}
            to="/delivery"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaTruck style={iconStyles} />
            Delivery
          </Link>
          <Link
            as={RouterLink}
            to="/marketing"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaMoneyCheckAlt style={iconStyles} />
            Marketing
          </Link>
          <Link
            as={RouterLink}
            to="/analytics"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaChartBar style={iconStyles} />
            Analytics
          </Link>
          <Link
            as={RouterLink}
            to="/payout"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaMoneyBillAlt style={iconStyles} />
            Payout
          </Link>
          <Link
            as={RouterLink}
            to="/discounts"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaMoneyBillAlt style={iconStyles} />
            Discounts
          </Link>
          <Link
            as={RouterLink}
            to="/audience"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaUserFriends style={iconStyles} />
            Audience
          </Link>
          <Link
            as={RouterLink}
            to="/appearance"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaPalette style={iconStyles} />
            Appearance
          </Link>
          <Link
            as={RouterLink}
            to="/plugins"
            display="flex"
            alignItems="center"
            mb="2"
          >
            <FaCogs style={iconStyles} />
            Plugins
          </Link>
        </Box>

        {/* wallet */}
        <Box
          position="absolute"
          bottom="0"
          left="1.5"
          w="85%"
          borderRadius="10px"
          m="2"
        >
          <Flex
            align="center"
            justify="flex-end"
            bg="#353C53"
            p="3 "
            borderRadius="7px"
          >
            <Box mr="5" bg="#3d445a" p="2" borderRadius="7px">
              <FaWallet />
            </Box>

            <Flex direction="column">
              <Box>Available Credits</Box>
              <Box>222.10</Box>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Main Content */}
      <Box w="82%" ml="18%" p="4" overflowY="auto">
        <Flex
          justify="space-between"
          h="50px"
          borderBottom="2px solid black"
          mb="20px"
        >
          <Box>
            <Flex alignItems="center">
              <Text fontSize="xl" fontWeight="bold" mr="5px">
                Payouts
              </Text>
              <Tooltip label="Information about Payouts" fontSize="sm">
                <span>
                  <FaRegQuestionCircle />
                </span>
              </Tooltip>
            </Flex>
          </Box>
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.300" />}
              />
              <Input
                placeholder="      Search features tutorial etc"
                w="300px"
                mr="2"
                bg="#F2F2F2"
                pl="10px" // Padding left to account for the icon
              />
            </InputGroup>
          </Box>

          <Flex justify="space-between">
            <Button mr="4px" borderRadius="full">
              <FaEdit />
            </Button>
            <Menu>
              <MenuButton as={Box} ml="2">
                <Button borderRadius="full">
                  <FaCaretDown />
                </Button>
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/store">
                  Store
                </MenuItem>
                <MenuItem as={RouterLink} to="/logout">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Flex justify="space-between" mb="2%" mt="2%">
          <Text fontSize="xl" fontWeight="bold">
            Overview
          </Text>
          <Box>
            <Select
              placeholder="This Month"
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="Privious Month">Privious Month</option>
              <option value="Privious Quarter">Privious Quarter</option>
              <option value="Privious Year">Privious Year</option>
            </Select>
          </Box>
        </Flex>
        {/* Grid layout */}
        <Flex justify="space-between">
          <Box
            bg="#146EB4"
            p="4"
            flex="1"
            mr="2"
            borderRadius="10px"
            color="white"
            position="relative"
          >
            <div>
              <Flex alignItems="center">
                <Text mr="5px">Next Payout</Text>
                <Tooltip label="Information about Next Payout" fontSize="sm">
                  <span>
                    <FaRegQuestionCircle />
                  </span>
                </Tooltip>
              </Flex>

              <Flex justify="space-between">
                <Text fontSize="xl">₹{totalAmount}</Text>
                <p>
                  <Link>
                    <Text as="u">{ordersData.length} orders</Text>
                  </Link>
                </p>
              </Flex>
            </div>
            <Flex
              justify="space-between"
              bg="#0E4F82"
              bottom="0"
              left="0"
              right="0"
              position="absolute"
              borderBottomLeftRadius="10px"
              borderBottomRightRadius="10px"
              color="white"
              p="2"
            >
              <Text>Next payout date:</Text>
              <Text>Today, 04:00PM</Text>
            </Flex>
          </Box>

          <Box bg="green.200" p="4" flex="1" mr="2" borderRadius="10px">
            <Flex alignItems="center">
              <Text mr="5px">Amount Pending</Text>
              <Tooltip label="Information about Amount Pending" fontSize="sm">
                <span>
                  <FaRegQuestionCircle />
                </span>
              </Tooltip>
            </Flex>

            <Text fontSize="xl">₹{pendingAmount}</Text>
            <p>
              <Link>View {refunds} orders </Link>
            </p>
          </Box>
          <Box bg="orange.200" p="4" flex="1" borderRadius="10px">
            <Flex alignItems="center">
              <Text mr="5px">Amount Processed</Text>
              <Tooltip label="Information about Amount Processed" fontSize="sm">
                <span>
                  <FaRegQuestionCircle />
                </span>
              </Tooltip>
            </Flex>

            <Text fontSize="xl">₹{payoutAmount}</Text>
            <p>
              <Link>View {payouts} orders</Link>
            </p>
          </Box>
        </Flex>

        {/* filter button */}
        <Box mt="2%" mb="2%">
          <Text fontSize="xl" mb="2%" fontWeight="bold">
            Transactions | {month}
          </Text>
          <Button
            onClick={handlePayout}
            bg={isPayoutActive ? " #146EB4" : "#E6E6E6"}
            color={isPayoutActive ? "white" : "black"}
            mr="2%"
            borderRadius="full"
          >
            Payouts ({payouts})
          </Button>
          <Button
            onClick={handleRefund}
            bg={isRefundActive ? " #146EB4" : "#E6E6E6"}
            color={isRefundActive ? "white" : "black"}
            mr="2%"
            borderRadius="full"
          >
            Refunds ({refunds})
          </Button>
          {bgcl && (
            <Button
              bg="orange.200"
              onClick={handleReset}
              color="black"
              ml="auto"
              borderRadius="full"
            >
              Reset
            </Button>
          )}
        </Box>
        {/* Flex for search and sort */}
        <Flex align="center" justify="space-between" mb="4" mt="5">
          {/* Search Box */}
          <Input
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search Order ID or Transaction ID"
            w="40%"
            mr="2"
          />

          <Box>
            {/* Sort Button */}
            <Button
              onClick={handleSortByDate}
              rightIcon={<FaSort />}
              variant="outline"
              mr="10px"
            >
              Sort
            </Button>

            {/* Download Icon */}

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Download"
                icon={<FaDownload />}
                variant="outline"
                ml="auto"
                mr="10px"
              />
              <MenuList color="black">
                <MenuItem onClick={downloadData1}>Text</MenuItem>
                <MenuItem onClick={downloadData2}>HTML</MenuItem>
                <MenuItem onClick={downloadData3}>XML</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        {/* Table */}
        <Table variant="simple">
          <Thead bg="#F2F2F2">
            <Tr>
              <Th>Order ID</Th>
              <Th>Status</Th>
              <Th>Transaction ID</Th>
              <Th>Refund Date</Th>
              <Th>Order Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((order, index) => (
              <Tr key={index}>
                <Td color="#146EB4" fontWeight="bold">
                  <RouterLink to={`/orders/${order.orderId}`}>
                    {`#${order.orderId}`}
                  </RouterLink>
                </Td>
                <Td>
                  <Badge
                    variant="outline"
                    colorScheme={order.status === "success" ? "green" : "gray"}
                  >
                    {order.status === "success" ? "Successful" : "Processing"}
                  </Badge>
                </Td>
                <Td>{order.transactionId}</Td>
                <Td>{order.refundDate}</Td>
                <Td>₹{order.orderAmount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Dashboard;
