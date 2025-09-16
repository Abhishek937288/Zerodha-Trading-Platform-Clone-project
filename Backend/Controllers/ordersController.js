import positionModel from "../Models/positionsModel.js";
import fundModel from "../Models/fundsModel.js";
import orderModel from "../Models/ordersModel.js";
import holdingModel from "../Models/holdingsModel.js";

export const orders = async (req, res) => {
  const orders = await orderModel.find({ userId: req.userId });
  if (!orders) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "unable to fetch orders or not orders till now",
    });
  } else {
    return res.status(200).json({
      data: orders,
      success: true,
      message: "orders found successfully",
    });
  }
};

export const buy = async (req, res) => {
  try {
    const { name, price, qty } = req.body;
    if (!name || !price || !qty || qty <= 0 || price <= 0) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Invalid input",
      });
    }

    // for funds

    let fund = await fundModel.findOne({ userId: req.userId });
    if (!fund) {
      return res
        .status(400)
        .json({ data: null, success: false, message: "user dont have fund" });
    }
    if (price * qty > fund.totalAmount) {
      return res
        .status(400)
        .json({ data: null, success: false, message: "insuffcient amount" });
    }
    fund.totalAmount -= price * qty;
    fund.investedAmount += price * qty;
    await fund.save();

    // for the funds

    let holding = await holdingModel.findOne({ userId: req.userId, name });

    if (!holding) {
      holding = new holdingModel({
        name,
        qty,
        avg: price,
        price: price,
        net: "0",
        day: "0",
        userId: req.userId,
      });
    } else {
      const totalQty = holding.qty + qty;
      holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
      holding.qty = totalQty;
      holding.price = price;

      const net = (((holding.price - holding.avg) / holding.avg) * 100).toFixed(
        2
      );
      const day = (
        ((holding.price - holding.prevClose) / holding.prevClose) *
        100
      ).toFixed(2);

      holding.day = (day >= 0 ? "+" : "") + day + "%";
      holding.net = (net >= 0 ? "+" : "") + net + "%";
      holding.isLoss = holding.price < holding.avg;
    }

    await holding.save();

    // for the position

    let position = await positionModel.findOne({ userId: req.userId, name });

    if (!position) {
      position = new positionModel({
        product: "CNC",
        name,
        qty,
        avg: price,
        price,
        net: "0",
        day: "0",
        isLoss: false,
        userId: req.userId,
      });
    } else {
      const totalQty = position.qty + qty;
      position.avg = (position.avg * position.qty + price * qty) / totalQty;
      position.qty = totalQty;
      position.price = price;

      const net = (
        ((position.price - position.avg) / position.avg) *
        100
      ).toFixed(2);
      const day = (
        ((position.price - position.prevClose) / position.prevClose) *
        100
      ).toFixed(2);

      position.net = (net >= 0 ? "+" : "") + net + "%";
      position.day = (day >= 0 ? "+" : "") + day + "%";
      position.isLoss = position.price < position.avg;
    }
    await position.save();
    // for the orders
    const newOrder = await new orderModel({
      name,
      qty,
      price,
      mode: "BUY",
      userId: req.userId,
    }).save();

    return res.status(200).json({
      data: newOrder,
      success: true,
      message: "order Placed successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

export const sell = async (req, res) => {
  try {
    const { name, qty, price } = req.body;
    if (!name || !price || !qty || qty <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ data: null, success: false, message: "Enter all fields" });
    }

    // for the holdings
    let holding = await holdingModel.findOne({ userId: req.userId, name });
    if (!holding) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "You dont have this stock",
      });
    }
    if (holding.qty < qty) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "insufficient stock quantity",
      });
    } else {
      const totalQty = holding.qty - qty;
      if (totalQty > 0) {
        holding.avg = (holding.avg * holding.qty - price * qty) / totalQty;
        holding.qty = totalQty;
        holding.price = price;

        const net = (
          ((holding.price - holding.avg) / holding.avg) *
          100
        ).toFixed(2);
        const day = (
          ((holding.price - holding.prevClose) / holding.prevClose) *
          100
        ).toFixed(2);

        holding.day = (day >= 0 ? "+" : "") + day + "%";
        holding.net = (net >= 0 ? "+" : "") + net + "%";
        holding.isLoss = holding.price < holding.avg;
        await holding.save();
      } else {
        await holdingModel.deleteOne({ name, userId: req.userId });
        return res.json({
          message: "Stock sold and removed from holdings.",
          success: true,
          data: null,
        });
      }
    }

    // for the positions

    let position = await positionModel.findOne({ userId: req.userId, name });
    if (!position) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "You dont stocks position",
      });
    }

    const totalQty = position.qty - qty;

    if (totalQty > 0) {
      position.avg = (position.avg * position.qty - price * qty) / totalQty;
      position.qty = totalQty;
      position.price = price;

      const net = (
        ((position.price - position.avg) / position.avg) *
        100
      ).toFixed(2);
      const day = (
        ((position.price - position.prevClose) / position.prevClose) *
        100
      ).toFixed(2);

      position.net = (net >= 0 ? "+" : "") + net + "%";
      position.day = (day >= 0 ? "+" : "") + day + "%";
      position.isLoss = position.price < position.avg;
      await position.save();
    } else {
      await positionModel.deleteOne({ name, userId: req.userId });
      return res.json({
        message: "Stock sold and removed from postions.",
        success: true,
        data: null,
      });
    }

    // for the funds
    let fund = await fundModel.findOne({ userId: req.userId });
    if (!fund) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "Fund not found",
      });
    }
    if (fund.investedAmount < price * qty) {
  return res.status(400).json({
    data: null,
    success: false,
    message: "Insufficient invested amount",
  });
}

    fund.totalAmount += price * qty;
    fund.investedAmount -= price * qty;
    await fund.save();

    // for the orders
    const newOrder = await new orderModel({
      name,
      qty,
      price,
      mode: "SELL",
      userId: req.userId,
    }).save();

    return res.status(200).json({
      data: newOrder,
      success: true,
      message: "order Placed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      success: false,
      message: "Internal server error",
    });
  }
};
