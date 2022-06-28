import Billdetail from "../models/billdetail";

export const addBillDetail = async (req, res) => {
  try {
    const billdetail = await Billdetail(req.body).save();
    res.json(billdetail);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};

export const listBillDetails = async (req, res) => {
  try {
    const billdetail = await Billdetail.find({ bill: req.params.id }).exec();
    res.json(billdetail);
  } catch (error) {
    res.status(400).json({ message: "Loi khong thanh cong" });
  }
};
