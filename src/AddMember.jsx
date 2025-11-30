import { useEffect, useState } from "react";
import api from "./api";
import { generatePaymentPDF } from "./generatePaymentPDF";
import { sendMessage } from "./sendMessage";

export default function AddMember({ hideDelete = false }) {
 

  const [showModal, setShowModal] = useState(false);
  const [showModalActive, setShowModalActive] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);

  const [deleteCin, setDeleteCin] = useState(null);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  
  const [editForm, setEditForm] = useState({
    cin: "",
    name: "",
    phone: "",
    sport_id: "",
    coach_cin: "",
    subscription_type: "",
  });
function calculateDaysLeft(expiryDate) {
  if (!expiryDate) return 0;
  const today = new Date();
  const exp = new Date(expiryDate);
  return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

function isExpired(expiryDate) {
  if (!expiryDate) return true;
  const today = new Date();
  const exp = new Date(expiryDate);
  return exp < today;
}

  const openEdit = (m) => {
    setEditForm({
      cin: m.cin,
      name: m.name,
      phone: m.phone,
      sport_id: m.sport_id,
      coach_cin: m.coach_cin,
      subscription_type: m.subscription_type,
    });

    setEditModal(true);
    setTimeout(() => setEditModalActive(true), 20);
  };

  function fixPhoneNumber(phone) {
  if (!phone) return "";
  let p = phone.replace(/\s+/g, ""); // حيد المسافات

  // إلا كان بدا بـ 0 → نحيدو
  if (p.startsWith("0")) p = p.substring(1);

  // إلا كان ما بداش بـ +212 → نضيفوه
  if (!p.startsWith("+212")) p = "+212" + p;

  return p;
}


  const saveEdit = async () => {
    try {
      const fd = new FormData();
      Object.keys(editForm).forEach((k) => fd.append(k, editForm[k]));

      const res = await api.post("/members.php?action=update", fd);

      if (res.data.success) {
        alert("Member updated");

        setEditModalActive(false);
        setTimeout(() => setEditModal(false), 220);

        await loadMembers();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  const confirmDelete = async () => {
    try {
      if (!deleteCin) return alert("No CIN to delete!");

      const fd = new FormData();
      fd.append("cin", deleteCin);

      const res = await api.post("/members.php?action=delete", fd);

      if (res.data.success) {
        alert("Member deleted ✔");

        setDeleteModalActive(false);
        setTimeout(() => {
          setDeleteCin(null);
          setDeleteModalActive(false);
        }, 220);

        await loadMembers();
      } else {
        alert("Delete failed: " + res.data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting member");
    }
  };

  const openDeleteModal = (cin) => {
    setDeleteCin(cin);
    setTimeout(() => setDeleteModalActive(true), 20);
  };

  // FORM STATES
  const [cin, setCin] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sportId, setSportId] = useState("");
  const [coachCin, setCoachCin] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [hasPaid, setHasPaid] = useState(true);
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [sports, setSports] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadData();
    loadMembers();
  }, []);

  const loadData = async () => {
    try {
      const sportsRes = await api.get("/sports.php?action=list");
      const coachesRes = await api.get("/coaches.php?action=list");

      setSports(sportsRes.data || []);
      setCoaches(coachesRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load sports/coaches");
    }
  };

  const loadMembers = async () => {
    try {
      const res = await api.get("/members.php?action=list");
      setMembers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load members");
    }
  };

  const validate = () => {
    let err = {};

    if (!cin.trim()) err.cin = "CIN is required";
    if (!name.trim()) err.name = "Name is required";
    if (!sportId) err.sportId = "Sport is required";
    if (!subscriptionType) err.subscriptionType = "Type required";
    if (!hasPaid) err.hasPaid = "Payment required!";
    if (!amount || Number(amount) <= 0) err.amount = "Enter valid amount";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setActionLoading(true);

    try {
      const payload = new FormData();

      payload.append("cin", cin);
      payload.append("name", name);
      payload.append("phone", phone);
      payload.append("sport_id", sportId);
      payload.append("coach_cin", coachCin);
      payload.append("subscription_type", subscriptionType);
      payload.append("has_paid", hasPaid ? "1" : "0");
      payload.append("amount", amount);

      const res = await api.post("/members.php?action=add", payload);

      if (res.data.success) {
        const sportName =
          sports.find((s) => s.id == sportId)?.sport_name || "-";

        if (hasPaid) {
          await generatePaymentPDF(
            { cin, name, sport_name: sportName },
            amount
          );
        }

        const msg = `سلام ${name}!\n✓ تسجيلك تم بنجاح.\nSport: ${sportName}\nSubscription: ${subscriptionType}\n${hasPaid ? "✓ الأداء: " + amount + " DH" : "لم يتم الأداء بعد"}\nمرحبا بك فـ Rachid Gym 💪`;

        sendMessage(phone, msg,);

        await loadMembers();

        setCin("");
        setName("");
        setPhone("");
        setSportId("");
        setCoachCin("");
        setSubscriptionType("");
        setHasPaid(false);
        setAmount("");
        setErrors({});

        setShowModalActive(false);
        setTimeout(() => setShowModal(false), 220);
      } else {
        alert(res.data.message || "Failed to add member");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePayment = async (memberCin) => {
    const amount = prompt("Enter amount (MAD):");
    if (!amount || isNaN(amount)) return alert("Invalid amount");

    try {
      const fd = new FormData();
      fd.append("cin", memberCin);
      fd.append("amount", amount);

      const res = await api.post("/members.php?action=pay", fd);

      if (res.data.success) {
        const member = members.find((m) => m.cin === memberCin);

        await generatePaymentPDF(member, amount);

        const msg = `سلام ${member.name}!\n✓ توصلنا بالدفع ديالك: ${amount} DH.\nمرحبا بك 💪`;
        console.log("Sending message to", member.phone);
        sendMessage(member.phone, msg, "/logo.jpg");

        await loadMembers();
        alert("Payment recorded");
      }
    } catch (e) {
      console.error(e);
      alert("Payment error");
    }
  };

  const paidMembers = members.filter((m) => {

  // Member MUST have paid
  if (!isPaid(m)) return false;

  // If expiry_date missing => still PAID (first payment)
  if (!m.expiry_date || m.expiry_date === "") return true;

  const days = calculateDaysLeft(m.expiry_date);

  // Normal case
  return days > 0 && !isExpired(m.expiry_date);
});

function isPaid(m) {
  return String(m.statut_paiement).toLowerCase() === "paid" || m.statut_paiement === "1";
}


const unpaidMembers = members.filter((m) => {

  // If not paid → always UNPAID
  if (!isPaid(m)) return true;

  const days = calculateDaysLeft(m.expiry_date);

  // paid but expired → UNPAID
  if (days <= 0 || isExpired(m.expiry_date)) return true;

  // paid and valid → not unpaid
  return false;
});




  const openAddModal = () => {
    setShowModal(true);
    setTimeout(() => setShowModalActive(true), 20);
  };

  const closeAddModal = () => {
    setShowModalActive(false);
    setTimeout(() => setShowModal(false), 220);
  };

  const closeEditModal = () => {
    setEditModalActive(false);
    setTimeout(() => setEditModal(false), 220);
  };

  const closeDeleteModal = () => {
    setDeleteModalActive(false);
    setTimeout(() => setDeleteCin(null), 220);
  };

  return (
  <div className="p-6 bg-white text-black fade-in">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-yellow-500 glow px-3 py-1 rounded">
        Members
      </h2>

      <button
        onClick={openAddModal}
        className="
          px-4 py-2 bg-yellow-500 text-black font-bold rounded 
          hover:bg-yellow-600 hover:shadow-xl hover:scale-[1.04]
          transition-all duration-200 
          btn-3d btn-pulse glow
        "
      >
        + Add Member
      </button>
    </div>

    {/* ADD MODAL */}
    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={closeAddModal}
          className={`fixed inset-0 bg-black/40 transition-opacity ${
            showModalActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`
            relative w-full max-w-lg rounded-xl p-6 bg-white text-black
            shadow-2xl border border-yellow-400/40
            transform transition-all duration-300 lift-3d
            ${showModalActive
              ? "opacity-100 translate-y-0 scale-100 glow"
              : "opacity-0 translate-y-6 scale-95"
            }
          `}
        >
          <h3 className="text-lg font-bold mb-3 text-yellow-600">
            Add New Member
          </h3>

          <form 
            onSubmit={handleAddMember}
            className="
              bg-white p-5 rounded-xl shadow-lg 
              hover:shadow-2xl transition-all duration-300 lift-3d
            "
          >

            {/* CIN */}
            <div>
              <label className="text-sm font-semibold text-gray-700">CIN</label>
              <input
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500 transition
                "
              />
              {errors.cin && (
                <p className="text-xs text-red-600 mt-1">{errors.cin}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500 transition
                "
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Phone</label>
              <input
                type="text"
                className="border border-yellow-400 p-2 w-full rounded focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(fixPhoneNumber(e.target.value))}
              />
            </div>

            {/* Sport */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Sport</label>
              <select
                value={sportId}
                onChange={(e) => setSportId(e.target.value)}
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
              >
                <option value="">Select sport</option>
                {sports.map((s) => (
                  <option key={s.id} value={s.id}>{s.sport_name}</option>
                ))}
              </select>
              {errors.sportId && (
                <p className="text-xs text-red-600 mt-1">{errors.sportId}</p>
              )}
            </div>

            {/* Coach */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Coach</label>
              <select
                value={coachCin}
                onChange={(e) => setCoachCin(e.target.value)}
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
              >
                <option value="">No coach</option>
                {coaches.map((c) => (
                  <option key={c.cin} value={c.cin}>{c.coach_name}</option>
                ))}
              </select>
            </div>

            {/* Subscription */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Subscription
              </label>
              <select
                value={subscriptionType}
                onChange={(e) => setSubscriptionType(e.target.value)}
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
              >
                <option value="">Select Type</option>
                <option value="monthly">Monthly</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
              </select>
              {errors.subscriptionType && (
                <p className="text-xs text-red-600 mt-1">{errors.subscriptionType}</p>
              )}
            </div>

            {/* Paid Now */}
            <div className="flex items-center gap-2 mt-2">
              <input
                id="paid"
                type="checkbox"
                checked={hasPaid}
                onChange={() => setHasPaid(!hasPaid)}
                className="accent-yellow-500"
              />
              <label className="font-semibold text-gray-700">Paid Now?</label>
            </div>

            {/* Amount */}
            {hasPaid && (
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Amount *
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="
                    w-full p-2 border border-yellow-400 rounded bg-white text-black
                    focus:ring-yellow-500 focus:border-yellow-500
                  "
                />
                {errors.amount && (
                  <p className="text-xs text-red-600 mt-1">{errors.amount}</p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={closeAddModal}
                className="
                  px-4 py-2 bg-gray-100 text-black rounded 
                  hover:bg-gray-200 hover:shadow-lg transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={actionLoading}
                className="
                  px-4 py-2 bg-yellow-500 text-black font-bold rounded 
                  hover:bg-yellow-600 hover:scale-105 hover:shadow-xl
                  transition-all btn-3d btn-pulse glow
                "
              >
                {actionLoading ? "Saving..." : "Add Member"}
              </button>
            </div>

          </form>
        </div>
      </div>
    )}

    {/* TABLES */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">

      {/* PAID MEMBERS */}
      <div className="bg-white p-4 rounded-lg shadow border border-yellow-500 lift-3d hover:shadow-2xl transition">
        <h4 className="font-bold text-yellow-600 mb-3">
          Members — PAID ({paidMembers.length})
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border border-yellow-500 rounded-lg overflow-hidden">
            <thead className="bg-yellow-500 text-black font-bold">
              <tr>
                <th className="p-2">CIN</th>
                <th className="p-2">Name</th>
                <th className="p-2">Sport</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {paidMembers.map((m) => (
                <tr 
                  key={m.cin} 
                  className="border-b row-3d hover:bg-yellow-50 hover:shadow-md transition"
                >
                  <td className="p-2 font-bold">{m.cin}</td>
                  <td className="p-2">{m.name}</td>
                  <td className="p-2">{m.sport_name}</td>
                  <td className="p-2 font-bold text-green-600">
                    {m.amount}
                  </td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePayment(m.cin)}
                        className="
                          px-2 py-1 bg-gray-100 text-black rounded 
                          hover:bg-gray-200 hover:shadow-md transition btn-3d
                        "
                      >
                        Add Pay
                      </button>

                      <button
                        onClick={() => openEdit(m)}
                        className="
                          px-2 py-1 bg-yellow-500 text-black rounded 
                          hover:bg-yellow-600 hover:shadow-lg btn-3d glow
                        "
                      >
                        Edit
                      </button>

                      {!hideDelete && (
                        <button
                          className="
                            px-2 py-1 bg-red-600 text-white rounded 
                            hover:bg-red-700 hover:shadow-lg transition
                          "
                          onClick={() => openDeleteModal(m.cin)}
                        >
                          Delete
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UNPAID MEMBERS */}
      <div className="bg-white p-4 rounded-lg shadow border border-yellow-500 lift-3d hover:shadow-2xl transition">
        <h4 className="font-bold text-yellow-600 mb-3">
          Members — UNPAID ({unpaidMembers.length})
        </h4>

        <table className="w-full text-sm bg-white border border-red-400 rounded-lg overflow-hidden">
          <thead className="bg-red-600 text-white font-bold">
            <tr>
              <th className="p-2">CIN</th>
              <th className="p-2">Name</th>
              <th className="p-2">Sport</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {unpaidMembers.map((m) => (
              <tr 
                key={m.cin} 
                className="border-b row-3d hover:bg-red-50 hover:shadow-md transition"
              >
                <td className="p-2 font-bold">{m.cin}</td>
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.sport_name}</td>

                <td className="p-2 font-bold">
                  {isExpired(m.expiry_date) ? (
                    <span className="text-red-700">EXPIRED</span>
                  ) : (
                    <span className="text-red-600">UNPAID</span>
                  )}
                </td>

                <td className="p-2">
                  <div className="flex gap-2">

                    <button
                      onClick={() => handlePayment(m.cin)}
                      className="
                        px-2 py-1 bg-gray-100 text-black rounded 
                        hover:bg-gray-200 hover:shadow-md transition btn-3d
                      "
                    >
                      Pay
                    </button>

                    <button
                      onClick={() => openEdit(m)}
                      className="
                        px-2 py-1 bg-yellow-500 text-black rounded 
                        hover:bg-yellow-600 hover:shadow-lg btn-3d glow
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(m.cin)}
                      className="
                        px-2 py-1 bg-red-600 text-white rounded 
                        hover:bg-red-700 hover:shadow-lg transition btn-3d
                      "
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* EDIT MODAL */}
    {editModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={closeEditModal}
          className={`fixed inset-0 bg-black/40 transition-opacity ${
            editModalActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`
            relative w-full max-w-lg rounded-xl p-6 bg-white text-black
            shadow-2xl border border-yellow-400/40
            transform transition-all duration-300 lift-3d
            ${editModalActive
              ? "opacity-100 translate-y-0 scale-100 glow"
              : "opacity-0 translate-y-6 scale-95"
            }
          `}
        >
          <h3 className="text-lg font-bold mb-3 text-yellow-600">
            Edit Member
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-700">Name</label>
              <input
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Phone</label>
              <input
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Sport</label>
              <select
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
                value={editForm.sport_id}
                onChange={(e) =>
                  setEditForm({ ...editForm, sport_id: e.target.value })
                }
              >
                {sports.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.sport_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Coach</label>
              <select
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
                value={editForm.coach_cin}
                onChange={(e) =>
                  setEditForm({ ...editForm, coach_cin: e.target.value })
                }
              >
                <option value="">No coach</option>
                {coaches.map((c) => (
                  <option key={c.cin} value={c.cin}>
                    {c.coach_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Subscription</label>
              <select
                className="
                  w-full p-2 border border-yellow-400 rounded bg-white text-black
                  focus:ring-yellow-500 focus:border-yellow-500
                "
                value={editForm.subscription_type}
                onChange={(e) =>
                  setEditForm({ 
                    ...editForm, 
                    subscription_type: e.target.value 
                  })
                }
              >
                <option value="monthly">Monthly</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closeEditModal}
              className="
                px-4 py-2 bg-gray-100 text-black rounded 
                hover:bg-gray-200 hover:shadow transition
              "
            >
              Cancel
            </button>

            <button
              onClick={saveEdit}
              className="
                px-4 py-2 bg-yellow-500 text-black rounded font-bold 
                hover:bg-yellow-600 hover:shadow-xl btn-3d glow
              "
            >
              Save
            </button>
          </div>

        </div>
      </div>
    )}

    {/* DELETE MODAL */}
    {deleteCin && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={closeDeleteModal}
          className={`fixed inset-0 bg-black/40 transition-opacity ${
            deleteModalActive ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`
            relative w-full max-w-sm p-6 bg-white text-black rounded-xl 
            shadow-2xl border border-yellow-400/40
            transform transition-all duration-300 lift-3d
            ${deleteModalActive
              ? "opacity-100 translate-y-0 scale-100 glow"
              : "opacity-0 translate-y-6 scale-95"
            }
          `}
        >
          <h3 className="text-lg font-bold mb-3 text-yellow-600">
            Delete Member?
          </h3>

          <p className="text-gray-700">
            Are you sure you want to delete member{" "}
            <b className="text-black">{deleteCin}</b>?
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={closeDeleteModal}
              className="
                px-4 py-2 bg-gray-100 text-black rounded 
                hover:bg-gray-200 hover:shadow transition
              "
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="
                px-4 py-2 bg-red-600 text-white rounded 
                hover:bg-red-700 hover:shadow-xl btn-3d
              "
            >
              Delete
            </button>
          </div>

        </div>
      </div>
    )}

  </div>
);

}
