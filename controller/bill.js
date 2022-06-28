import Bill from "../models/bill";
import Billdetail from "../models/billdetail";

export const addBill = async (req, res) => {
  try {
    const bill = await Bill(req.body).save();
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const listBill = async (req, res) => {
  try {
    const bills = await Bill.find().populate("user").exec();
    res.json(bills);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const removeBill = async (req, res) => {
  try {
    const result = await Bill.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    let billdetailId = await Billdetail.find({ bill: result._id }).exec();

    await Billdetail.deleteMany({
      _id: { $in: billdetailId },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const listBillDetails = async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id }).exec();
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const updateBillStatus = async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).exec();
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};
