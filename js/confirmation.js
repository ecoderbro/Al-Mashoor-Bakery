/* Confirmation page: shows the order saved by checkout.js */
let order = null;
try { order = JSON.parse(sessionStorage.getItem('am_order')) } catch (e) {}
const doneEl = $('#done');
if (!order) { doneEl.innerHTML = '<h2>No recent order</h2><p class="sub">Your cart is empty.</p><a class="btn" href="menu.html">Browse the menu</a>' } else {
    const { id, msg, total } = order;
    const safe = msg.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
    doneEl.innerHTML = `<h2>Order ${id} is ready</h2><p class="sub">One last step: send us your order so we can confirm it.</p>
 <div class="box" style="max-width:640px"><pre style="white-space:pre-wrap;font-family:inherit;margin:0 0 16px">${safe}</pre>
 <a class="btn" href="mailto:devflowcreative@gmail.com?subject=${encodeURIComponent('Order '+id)}&body=${encodeURIComponent(msg)}">Send order by email</a>
 <a class="btn alt" href="https://wa.me/92${PHONE.slice(1)}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a>
 <p class="sub" style="margin:14px 0 0">Pay ${rs(total)} in cash when your order arrives.</p></div>`
}