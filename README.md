# ATOMS — Abu Twins Inventory & Operations Management System

Enterprise WordPress plugin for multi-branch phone retail. Inventory, IMEI tracking, sales, returns, swaps, customer debts, transfers, repairs, expenses, audit, and reports.

Core data lives in custom tables, not `wp_posts`. Posted financial records are never edited — corrections go through payments, reversals, voids, and approvals.

## Download & install

Ready-to-use WordPress plugin zip:

**[dist/abutwins-invent.zip](dist/abutwins-invent.zip)**

1. In WordPress admin, go to **Plugins → Add New → Upload Plugin**
2. Choose `abutwins-invent.zip` and click **Install Now**
3. Activate **ATOMS — Inventory & Operations**

Requirements: WordPress 6.4+, PHP 8.1+

## Tools (PHPUnit)

PHPUnit runs through OrbStack. Homebrew PHP is not required.

```bash
make tools    # downloads tools/phpunit.phar and tools/composer.phar
make test     # domain tests (money, IMEI, WhatsApp, aging)
```

Or directly:

```bash
./tools/install-tools.sh
./bin/phpunit --colors=always
```

`./bin/php` is a wrapper around `wordpress:cli-php8.2` (PHP 8.2.33).

## Run locally

```bash
docker compose up -d
```

- App: [http://localhost:8080/wp-admin/admin.php?page=atoms](http://localhost:8080/wp-admin/admin.php?page=atoms)
- Phone PWA: [http://localhost:8080/atoms-app/](http://localhost:8080/atoms-app/)
- Login: `admin` / `admin`

If the CLI container has already exited:

```bash
docker compose run --rm --entrypoint wp cli plugin activate atoms --allow-root --path=/var/www/html
```

End-to-end smoke (purchase → IMEI → sale → payment → return → supplier ledger → repair → expense → notify → analytics → stock count → reports → automation):

```bash
make smoke
```

## Phase 1

- Purchase order → receive → IMEI registration → stock available
- IMEI search with full history
- Multi-branch inventory and transfer workflow
- Sales with minimum-price protection
- Customer payments as ledger events
- Returns, swaps, audit, reports

## Phase 2

- Repairs: receive → diagnose → repair → return to customer / back to stock / unfixable
- Supplier ledger: purchases increase payables; payments post separately
- Expenses: categories, threshold approval, then ledger posting
- Approvals engine: price overrides and expenses above ₦50,000

## Staff setup

1. In WordPress, create a user.
2. Assign an ATOMS role (`ATOMS Cashier`, `ATOMS Vault Manager`, `ATOMS Engineer`, etc.).
3. In ATOMS → Settings, attach that user to one or more branches.

## API

WordPress REST namespace: `/wp-json/atoms/v1/`

Phase 3 routes: `/analytics`, `/notifications`, `/notifications/{id}/read`, `/settings`, `/outbox`.

## Phase 3

- Phone PWA at `/atoms-app/` with a service worker and offline sale queue
- Camera barcode / IMEI scan on POS, receiving, returns, repairs, and transfers
- In-app notification centre plus WhatsApp outbox (`wa.me` links; API token optional)
## Phase 4

- Stock count: snapshot available/faulty IMEIs, scan what is on the floor, variance needs approval
- Missing devices are disposed only after approval — never a silent edit
- Dashboard stock-by-branch shows every branch; available count is for the selected branch

Phase 4 routes: `/stock-counts`, `/stock-counts/{id}/scan`, `/stock-counts/{id}/submit`, `/stock-counts/{id}/cancel`.

## Phase 5

- Reporting pack: today / week / month / year / custom range
- Sales, inventory valuation, IMEI status, stock movement, cash position, expenses, receivables, payables
- Invoice drill-down and print; CSV export so staff do not rebuild numbers in Excel
- Below-min POS sales return `pending_approval` (device reserved) instead of looking like a failed sale
- Supplier device return: available/faulty IMEI → disposed, supplier ledger credited by cost

Phase 5 routes: `/reports/pack`, `/reports/export`, `/suppliers/{id}/returns`.

## Phase 6

- Hourly automation: overdue debts, stuck transfers, stuck repairs, pending-approval reminders, faulty IMEI escalation, daily digest
- Alerts are deduped so the same debt or digest cannot flood the inbox
- Settings → Run now; WordPress cron runs the same jobs every hour
- Payment reversal restores the invoice due (the ledger was already reversed; the displayed due was not)

Phase 6 routes: `/automation`, `/automation/run`.

## Phase 7

- Grouped navigation (Floor / Stock / Money / Office) and a phone bottom bar for Sale, IMEI, Home, Alerts
- Live global search: IMEI, invoice, customer, product, supplier — invoices open print, devices open history
- Statuses use business language (“In stock”, “Waiting for approval”)
- POS starts at the IMEI; discount is behind “more”; branch and payment method are remembered
- Cream page background matching the shop sign; larger tap targets on phones

Phase 7 is UI only — no new tables.

## Phase 8

- CSV import for products, customers, suppliers, opening IMEIs, and historical sales
- Same SKU / phone / invoice is idempotent (update or skip, never duplicate stock)
- Opening customer/supplier balances post once as ledger events
- Historical sales keep the original invoice number and date; day-to-day POS still cannot backdate
- Settings → Bring in the old books; download a template, then import

Phase 8 routes: `/import`, `/import/template`.

## Phase 9

- POS records **Sold by**; repairs record the **engineer**; invoices print the salesperson
- Branch reports: revenue, collected, due, profit, stock, collection rate
- Staff sales report and CSV (invoices, revenue, profit, collection %)
- Analytics uses shop local time (not GMT), so WAT days match the floor
- Invoice / ticket / PO sequences use the local calendar year

Phase 9 is accountability — no new tables. DB stays 1.3.0.

## Phase 10

- Audit trail is searchable (invoice, IMEI, action, dates) with who, branch, IP, and old vs new
- Branch managers only see their branches; company-wide events still appear
- Human labels (“Sale posted”, “Payment added”) instead of machine keys
- CSV export; customer edits record the previous values, not a blank old row

Phase 10 routes: `/audit`, `/audit/export`.

## Phase 11

- Customer statement: ledger, invoices, WhatsApp reminder, CSV — payments from the customer, not a typed ID
- Void a posted sale from Reports or the statement (reason required). The invoice is not edited; stock and the ledger reverse as new events
- Cannot void an invoice that already has a return, or if the IMEI is no longer sold
- Warranty return opens a repair ticket and puts the IMEI under repair

Phase 11 routes: `/customers/{id}`, `/customers/{id}/statement`, `POST /sales/{id}/void`.

## Phase 12

- Approvals desk shows what is waiting: sell below min, expense over threshold, or stock-count gap — with IMEI/price, amount, who asked, and branch
- Branch managers only see their branches; auditors only see stock-count variances (they cannot approve a below-min sale)
- Optional review notes are stored on the approval; the original sale, expense, or count is not edited in place

Phase 12 routes: `/approvals`, `POST /approvals/{id}/decide`.

## Phase 13

- Products have warranty days (default 365, 0 = no cover). A warranty return is refused after expiry — use faulty/good instead
- IMEI history and invoices show remaining cover
- Sidebar wordmark comes from Settings (company / wordmark / accent / tagline), not a hardcoded Abu Twins string
- REST is rate-limited (120 requests / minute / user). Auth is WordPress nonce or Application Passwords — there is no custom JWT

Phase 13 adds `warranty_days` on products (DB 1.4.0).

## Phase 14

- Trade-in desk: search the customer by phone (create if new), live difference, recent swaps. No typed customer ID
- Outgoing swap cannot go below the product minimum unless a manager completes it
- Repairs and supplier pay/return use names, not database IDs. Purchase IMEI registration picks the product on the PO. Purchase date / expected arrival match the goods-in flow

Phase 14 routes: `GET/POST /swaps`. DB stays 1.4.0.

## Phase 15

- WhatsApp API token is encrypted at rest and never returned on REST/bootstrap. Leave the field blank to keep a saved token
- Alerts outbox: open the wa.me chat, then mark sent (rows are closed, never deleted)
- Supplier list shows address and what we owe; open a supplier for the ledger. Customers take an address. Transfers name the branches

Phase 15 routes: `POST /outbox/{id}/sent`. DB stays 1.4.0.

## Phase 16

- Returns: scan the IMEI to locate the invoice — staff do not type the invoice number. Only a sold device can be returned
- Receipts use shop identity (wordmark / cream sheet / blue header / olive totals), branch address, serial, and print after POS
- Goods-in accepts `IMEI,serial`. IMEI history shows the serial and last invoice

Phase 16 routes: `GET /returns/locate`. DB stays 1.4.0.

## Phase 17

- Sales, returns, new customers, and customer payments queue on this device when the network drops, then sync with **idempotent replay** (`client_id` / `X-Idempotency-Key`) so a retry never double-posts
- Lookups (bootstrap, dashboard, IMEI, customers, products, return locate, sale invoices) are cached; products/customers warm on boot while online
- Dashboard shows the offline outbox (pending + failed), with Sync now. The online badge includes the queued count
- PWA service worker registers Background Sync (`atoms-flush`) and falls back to the app shell offline
- Domain conflicts (e.g. IMEI already sold) stay on the queue as failed until dismissed — they are not retried forever; transient 5xx/429 errors retry with backoff

Phase 17 / 3.25 routes: bootstrap includes `offline` (queue patterns, warm_gets, max_retries). DB **1.8.0** adds `atoms_idempotency`.

## Phase 18

- Products carry colour and storage variants. Stock, POS, swaps, purchases, IMEI history, and receipts show the variant — not just the model name
- Variant minimum price beats the product floor when set. Goods-in picks colour/storage on the PO; IMEIs inherit the variant on register
- Archive a product (`POST /products/{id}/archive`) instead of deleting it. Nothing disappears from the audit trail

Phase 18 routes: `GET /products/{id}`, `POST /products/{id}/variants`, `POST /products/{id}/archive`. DB stays 1.4.0.

## Phase 19

- **Archive policy** — products, customers, and suppliers archive instead of delete. Posted sales, payments, and IMEI history stay forever
- **Guards** — cannot archive a product while devices are still `available`; cannot archive a customer or supplier while money is still owed
- **UI** — Inventory catalog, customer statement, and supplier desk each expose Archive when the balance is clear and stock is gone
- **Import** — product CSV accepts `color`, `storage`, and `variant_min` to seed colour/storage rows on upload

Phase 19 routes: `POST /customers/{id}/archive`, `POST /suppliers/{id}/archive`. Bootstrap includes `archive.entities`. DB stays 1.4.0.

## Phase 20

- **Wholesale desk** — POS and import accept `retail` or `wholesale`. Wholesale must name the customer; minimum-price and approval rules are the same as retail
- **Reporting** — dashboard and reports split net sales by type. Invoices and CSV exports carry the sale type
- **Receipts** — print layout shows Retail or Wholesale on the invoice header

Phase 20: bootstrap includes `wholesale`. DB stays 1.4.0.

## Phase 21

- **Low stock alerts** — variant- and branch-aware thresholds on the dashboard and inventory table. Product form and CSV import accept `low_stock_threshold` (0 = off)
- **Notifications** — low-stock scans name colour/storage and branch, not just the model
- **Restore catalog** — archived products, customers, and suppliers can be restored (`POST …/restore`, `GET …/archived`) without touching posted history

Phase 21 routes: `GET /inventory/low-stock`, `GET /products|customers|suppliers/archived`, `POST …/restore`. DB stays 1.4.0.

## Phase 22

- **IMEI import variants** — CSV accepts `color`, `storage`, and `serial_number`. Multi-variant products must name colour/storage; sole variants auto-attach
- **VariantResolver** — shared domain for import, purchase register, and POS stock checks
- **Analytics** — retail vs wholesale mix on the BI dashboard (`sale_types` on `/analytics`)
- **Receipts** — print layout and invoice PDF show subtotal and discount when a POS discount was posted

Phase 22: IMEI import headers extended. DB stays 1.4.0.

## Phase 23

- **Variant-aware BI** — top products and slow movers group by colour/storage, not just model name
- **Global search** — active catalog only; IMEI hits show variant; invoices show retail/wholesale
- **Sales history import** — when an IMEI is new, optional `color`, `storage`, `serial_number`, and `cost_price` seed opening stock with the right variant
- **Dashboard** — overdue invoice count respects the debt-days setting from Operations

Phase 23: search and analytics surface variant labels. DB stays 1.4.0.

## Phase 24

- **Transfer desk** — each transfer lists device count; detail view shows IMEI, product, colour/storage, and serial
- **CSV exports** — inventory and IMEI reports include a Variant column (and serial on IMEI export)
- **Catalog edit** — update min price, threshold, cost, and warranty on existing products without re-entering the SKU

Phase 24: transfer items and report exports carry variant labels. DB stays 1.4.0.

## Phase 25

- **Stock count** — each line shows product, colour/storage, and serial so vault staff match the right device
- **Repair desk** — open tickets list IMEI, model, and variant on one row
- **Party edit** — update customer name, phone, and address from the statement; update supplier contact details from the desk

Phase 25: stock count and repair surfaces carry variant labels; customers and suppliers can be edited in place. DB stays 1.4.0.

## Phase 26

- **Purchase desk** — open a PO to see each line’s colour/storage, cost, and received quantity
- **Swap desk** — trade-in form picks incoming variant; recent swaps show model and colour/storage for both phones
- **Returns** — scanning a sold IMEI names the variant on the invoice before you post the return

Phase 26: purchase, swap, and return flows surface variant labels. DB stays 1.4.0.

## Phase 27

- **Sales report** — device-level rows with IMEI, product, and variant; CSV export matches
- **Approvals desk** — below-min sales and stock-count gaps name the colour/storage waiting for review
- **Variant edit** — update min price on an existing colour/storage row from the catalog

Phase 27: sales exports and approvals carry variant labels; catalog variants can be edited. DB stays 1.4.0.

## Phase 28

- **Returns desk** — recent returns list IMEI, invoice, product, and colour/storage beside the scan form
- **Swap detail** — open a swap ticket to see trade-in and shop phone with variants
- **Global search** — find products by colour or storage; results show available variants

Phase 28: returns history, swap detail, and product search carry variant labels. DB stays 1.4.0.

## Phase 29

- **Repair detail** — open a ticket to see device variant, fault, diagnosis, and workflow actions
- **Return detail** — open a return to see invoice, returned devices with variants, and any replacement
- **Movement report** — stock movement CSV and reports pack break down events by product and colour/storage

Phase 29: repair and return detail desks plus variant-aware movement reporting. DB stays 1.4.0.

## Phase 30

- **Staff device sales** — reports and analytics attribute each sold IMEI to a salesperson with product and variant
- **Audit summaries** — sale, return, repair, and swap audit rows name the device colour/storage
- **Customer invoice drill-down** — open an invoice on the statement to see device lines before printing
- **Search → catalog** — pick a product from global search to jump to its catalog row

Phase 30: staff attribution, variant-aware audit, customer invoice drill-down, and product search focus. DB stays 1.4.0.

## Phase 31

- **Stock count detail** — open a past count to review every IMEI line with product and variant
- **Overdue receivables** — analytics lists open invoices with the devices sold and colour/storage
- **Supplier returns** — supplier desk shows devices sent back with variant and credit amount
- **Expense history** — recent expenses show when, vendor, branch, and description

Phase 31: stock count detail, receivable device context, supplier returns, and expense history polish. DB stays 1.4.0.

## Phase 32

- **Audit deep links** — open the sale, repair, return, transfer, stock count, or IMEI desk from an audit row
- **Alert deep links** — jump from notifications to approvals, debts, transfers, repairs, or low-stock catalog rows
- **Home overdue table** — dashboard lists overdue invoices with device variants and links to the customer
- **Receivable invoice export** — reports pack and CSV list every open invoice with devices sold

Phase 32: audit and alert navigation plus overdue receivable visibility on home and in exports. DB stays 1.4.0.

## Phase 33

- **Approval detail desk** — open a pending approval to review devices, expense, or stock-count lines before deciding
- **Payable purchase visibility** — home and reports list open POs with colour/storage variants and supplier links
- **Supplier open POs** — supplier desk shows outstanding purchase orders tied to the payable balance
- **Ledger context** — customer and supplier statements show invoice/PO numbers with device or variant summaries on each row

Phase 33: approval detail desk, payable purchase visibility, and ledger context on party statements. DB stays 1.4.0.

## Phase 34

- **Expense detail desk** — open any expense to review vendor, amount, branch, and jump to its approval when pending
- **Customer payment history** — statement lists every payment with method and linked invoice
- **Analytics payables** — open purchase orders with variant summaries alongside receivable aging
- **In-transit transfers** — home dashboard lists dispatched transfers with device variants and links to the transfer desk

Phase 34: expense detail, customer payments, analytics payables, and in-transit transfer visibility. DB stays 1.4.0.

## Phase 35

- **Open repairs on home** — dashboard lists every open ticket with customer, device variants, engineer, and age
- **Stuck transfers** — home shows transfers waiting past the configured hour threshold with variant context
- **Analytics repairs** — repair queue with device summaries alongside receivable and payable tables
- **Open repairs export** — reports pack and CSV list all open tickets across branches

Phase 35: open repair visibility, stuck transfer queue, and open-repairs export. DB stays 1.4.0.

## Phase 36

- **Pending approvals on home** — managers see the waiting queue with summary and links to the approval desk
- **Stuck repairs** — home highlights tickets open past the configured repair-day threshold
- **Faulty device queue** — faulty IMEIs with no repair ticket, with variant context on home and in analytics
- **Faulty devices export** — reports pack and CSV list isolated devices waiting for repair or supplier action

Phase 36: approval queue, stuck repair visibility, faulty device escalation, and faulty-devices export. DB stays 1.4.0.

## Phase 37

- **Supplier payment history** — supplier desk lists every payment with method and linked PO invoice
- **Open stock counts on home** — dashboard shows in-progress counts with missing devices and variant context
- **Analytics stock counts & stuck transfers** — operations queues alongside repairs, payables, and faulty devices
- **Open stock counts export** — reports pack and CSV list every open or pending-approval count

Phase 37: supplier payments, open stock count visibility, and stock-count export. DB stays 1.4.0.

## Phase 38

- **Recent returns on home** — dashboard shows returns posted in the last 14 days with device context and deep links to the return desk
- **Open wholesale invoices** — wholesale receivables table on home and analytics with customer and device context
- **Pending expenses queue** — expenses waiting for approval surfaced on home and analytics with links to the expense desk
- **Stuck faulty devices** — home highlights faulty IMEIs past the configured return-day threshold
- **Returns, expenses & wholesale exports** — reports pack and CSV for recent returns, pending expenses, and open wholesale invoices

Phase 38: after-sales visibility, wholesale receivables, pending expense queue, and related exports. DB stays 1.4.0.

## Phase 39

- **Recent swaps on home** — dashboard shows swaps posted in the last 14 days with in/out device context and links to the swap desk
- **Slow movers on home** — available stock sitting 21+ days surfaced on the branch dashboard
- **Stuck repairs in analytics** — repair tickets past the configured repair-day threshold alongside other operations queues
- **Branch-scoped slow movers** — analytics and reports slow-mover lists respect the selected branch
- **Swaps & slow-movers exports** — reports pack and CSV for recent swaps and idle inventory

Phase 39: swap activity, slow-mover visibility, stuck-repair analytics, and related exports. DB stays 1.4.0.

## Phase 40

- **Open retail invoices** — retail receivables table on home and analytics, complementing wholesale due lists
- **Recent sales on home** — dashboard shows sales posted in the last 14 days with device context and invoice links
- **Transit & stuck faulty in analytics** — in-transit transfers and long-waiting faulty devices join the analytics operations view
- **Branch alerts on home** — unread count and recent alerts with deep links to the source record
- **Retail receivables & recent sales exports** — reports pack and CSV for retail due invoices and recent sales activity

Phase 40: receivables split, recent sales, transit analytics, and branch alerts. DB stays 1.4.0.

## Phase 41

- **Recent collections on home** — customer payments posted in the last 14 days with invoice and customer links
- **Recent supplier payments on home** — supplier payouts surfaced alongside payables with links to supplier and PO desks
- **Overdue invoices in analytics** — receivables past the configured debt-day threshold join the analytics view
- **Collections & supplier payouts in analytics** — payment activity alongside sales, returns, and swaps
- **Alerts in analytics** — branch notification queue mirrored from the home dashboard
- **Payments exports** — reports pack and CSV for recent customer collections and supplier payments

Phase 41: cash collection visibility, overdue analytics, and payment exports. DB stays 1.4.0.

## Phase 42

- **Open purchases on home** — POs awaiting IMEI registration with supplier links and receive progress
- **Recent purchases on home** — completed intake in the last 14 days with item context and totals
- **Recent supplier returns on home** — devices sent back to suppliers with credit amounts and device detail
- **Purchase & return queues in analytics** — open POs, recent purchases, and supplier returns mirrored from home
- **Purchase & return exports** — reports pack and CSV for recent purchases and supplier returns

Phase 42: purchase intake and supplier return visibility. DB stays 1.4.0.

## Phase 43

- **Payment reversals on home** — reversed collections in the last 14 days with customer, invoice, and reason
- **Voided sales on home** — recently voided invoices with device context and void reason
- **Posted expenses on home** — expenses posted in the last 14 days alongside the pending queue
- **Corrections & spend in analytics** — reversals, voids, and posted expenses mirrored from home
- **Corrections & spend exports** — reports pack and CSV for payment reversals, voided sales, and recent expenses

Phase 43: corrections and spend visibility. DB stays 1.4.0.

## Phase 44

- **Recent audit activity on home** — branch-scoped audit trail with deep links to the source record
- **Recent transfers on home** — branch movement in the last 14 days with route, status, and device context
- **Recent stock counts on home** — posted counts alongside the open-count queue
- **Operations trail in analytics** — audit, transfers, and posted stock counts mirrored from home
- **Operations trail exports** — reports pack and CSV for recent audit, transfers, and stock counts

Phase 44: branch operations trail visibility. DB stays 1.4.0.

## Phase 45

- **Completed repairs on home** — recently closed tickets with device context and engineer
- **Approval decisions on home** — approved and rejected requests in the last 14 days alongside the pending queue
- **New customers on home** — recently created customers with current balance
- **After-sales completion in analytics** — repairs, approvals, and customers mirrored from home
- **After-sales completion exports** — reports pack and CSV for recent repairs, approvals, and customers

Phase 45: after-sales completion and approval history visibility. DB stays 1.4.0.

## Phase 46

- **Recent IMEI intake on home** — devices registered in the last 14 days with product context and source
- **Staff device sales on home** — salesperson device lines from the last 14 days with invoice links
- **Low stock in analytics** — branch threshold alerts mirrored as a table alongside slow movers
- **Intake & performance in analytics** — recent IMEIs, staff devices, and low stock joined to the analytics view
- **Intake & performance exports** — reports pack and CSV for recent IMEIs, staff devices, and low stock

Phase 46: staff performance and inventory intake visibility. DB stays 1.4.0.

## Phase 47

- **Receivable aging on home** — bucket totals and open invoice lines with customer and device context
- **Top products on home** — best sellers from the last 14 days with units and profit
- **Sales intelligence in analytics** — branch-scoped aging buckets and top_product_lines alias
- **Receivables & sales exports** — reports pack and CSV for receivable aging and top products

Phase 47: receivables aging and top sellers on home. DB stays 1.4.0.

## Phase 48

- **Payable aging on home** — supplier PO buckets and open purchase lines with variant context
- **Stock movement on home** — IMEI event summary and by-product breakdown for the last 14 days
- **Payables & movement in analytics** — payable aging buckets, movement_lines, and movement_events mirrored from home
- **Payable aging export** — reports pack and CSV with supplier, PO, variants, amount, age, and bucket

Phase 48: payables aging and stock movement visibility. DB stays 1.4.0.

## Phase 49

- **Retail vs wholesale on home** — sale type mix from the last 14 days with invoice counts and net revenue
- **Payment mix on home** — collection breakdown by payment method for the current branch
- **Branch & staff performance on home** — network branch leaderboard and staff sales summary
- **Sales mix exports** — reports pack and CSV for payment mix and sale types

Phase 49: sales mix and branch performance on home. DB stays 1.4.0.

## Phase 50

- **Sales trend on home** — daily net and collected totals for the last 14 days with a chart
- **Cash flow snapshot on home** — branch cash in, expenses, supplier payments, and net for the last 14 days
- **Top ledger balances on home** — highest customer receivables and supplier payables with deep links
- **Trend & ledger in analytics** — trend_lines, cash_snapshot, and party balance lines mirrored from home
- **Sales trend export** — reports pack and CSV for daily sales trend

Phase 50: sales trend and ledger desk on home. DB stays 1.4.0.

## Phase 51

- **Inventory snapshot on home** — available and faulty units with branch valuation totals
- **IMEI status on home** — device counts by status at the current branch
- **Top stock by value on home** — highest-value available inventory lines with variant context
- **Inventory desk in analytics** — imei_status_lines, inventory_snapshot, and inventory_lines mirrored from home
- **Inventory & status exports** — reports pack and CSV for IMEI status and inventory valuation

Phase 51: inventory valuation and IMEI status on home. DB stays 1.4.0.

## Phase 52

- **Sales today on home** — invoices, customers, devices, and totals posted today
- **Payments & returns today on home** — same-day collections and refunds with invoice links
- **Cash today on home** — branch inflows, outflows, and net cash for the current day
- **Expense desk on home** — pending approval queue plus posted today and 14-day spend totals
- **Today's floor in analytics** — today_* lines, today_cash_snapshot, and expense_snapshot mirrored from home
- **Today & expense exports** — reports pack and CSV for today sales, today payments, and expense snapshot

Phase 52: today's floor desk and expense snapshot. DB stays 1.4.0.

## Phase 53

- **Intake snapshot on home** — today's purchase, IMEI registration, supplier payment, and swap counts with totals
- **Purchases & IMEIs today on home** — same-day PO intake and device registration with supplier and IMEI links
- **Supplier payments & swaps today on home** — payouts and swap collections posted today
- **Intake desk in analytics** — intake_snapshot and today_* intake lines mirrored from home
- **Intake exports** — reports pack and CSV for intake snapshot, today purchases, today IMEIs, and today supplier payments

Phase 53: today's intake and supplier desk. DB stays 1.4.0.

## Phase 54

- **Operations queue on home** — open repairs, pending approvals, in-transit, stock counts, faulty devices, pending expenses, open purchases, and stuck queues in one snapshot
- **Today's workflow on home** — transfers, completed repairs, and audit activity posted today with deep links
- **Operations desk in analytics** — operations_snapshot and today_* workflow lines mirrored from home
- **Operations exports** — reports pack and CSV for operations snapshot, today transfers, today repairs, and today audit

Phase 54: operations queue and today's workflow desk. DB stays 1.4.0.

## Phase 55

- **Receivables snapshot on home** — overdue, retail, wholesale, and open invoice counts with totals, plus collections today and unread alerts
- **Approvals & customers today on home** — same-day approval decisions and new customer registrations with links
- **Collections desk in analytics** — receivables_snapshot and today_* lines mirrored from home
- **Receivables exports** — reports pack and CSV for receivables snapshot, today approvals, and today customers

Phase 55: collections and receivables desk. DB stays 1.4.0.

## Phase 56

- **Payables snapshot on home** — open and aged payables, open POs, and today's supplier payments and returns with totals
- **Supplier returns & stock counts today on home** — same-day supplier credits and posted stock counts with supplier and count links
- **Payables desk in analytics** — payables_snapshot and today_* supplier lines mirrored from home
- **Payables exports** — reports pack and CSV for payables snapshot, today supplier returns, and today stock counts

Phase 56: payables and supplier ledger desk. DB stays 1.4.0.

## Phase 57

- **Adjustments snapshot on home** — today's returns, payment reversals, and voided sales with refund and total amounts
- **Reversals & voids today on home** — same-day payment reversals and voided invoices with customer and invoice links
- **Adjustments desk in analytics** — adjustments_snapshot and today_* correction lines mirrored from home
- **Adjustments exports** — reports pack and CSV for adjustments snapshot, today returns, today reversals, and today voided sales

Phase 57: returns and adjustments desk. DB stays 1.4.0.

## Phase 58

- **Performance snapshot on home** — low stock, slow movers, top sellers (14d), unread alerts, and alerts posted today
- **Alerts today on home** — same-day notifications with open links where available
- **Performance desk in analytics** — performance_snapshot and today_notify_lines mirrored from home
- **Performance exports** — reports pack and CSV for performance snapshot and today alerts

Phase 58: alerts and inventory performance desk. DB stays 1.4.0.

## Phase 59

- **Staff snapshot on home** — staff and branch sales totals (14d), top performer revenue, and today's sales count
- **Sales today on home** — same-day invoices with customer and paid amounts (via staff_snapshot + today_sales_lines)
- **Staff desk in analytics** — staff_snapshot and today_sales_lines mirrored from home
- **Staff exports** — reports pack and CSV for staff snapshot and today sales

Phase 59: staff and branch performance desk. DB stays 1.4.0.

## Phase 60

- **Movement snapshot on home** — today's transfers, IMEI intake, stock counts, in-transit/stuck transfers, and 14-day IMEI event totals
- **Transfers today on home** — same-day branch transfers with route and device summary (via movement_snapshot + today_transfer_lines)
- **Movement desk in analytics** — movement_snapshot and today_transfer_lines mirrored from home
- **Movement exports** — reports pack and CSV for movement snapshot and today transfers

Phase 60: movement and stock flow desk. DB stays 1.4.0.

## Phase 61

- **Ledger snapshot on home** — customer receivables, supplier payables, overdue totals, 14-day cash net, and sales/collected totals
- **Payments today on home** — same-day collections with customer and invoice links (via ledger_snapshot + today_payment_lines)
- **Ledger desk in analytics** — ledger_snapshot and today_payment_lines mirrored from home
- **Ledger exports** — reports pack and CSV for ledger snapshot and today payments

Phase 61: cash and consolidated ledger desk. DB stays 1.4.0.

## Phase 62

- **Repair snapshot on home** — open and stuck repairs, completions today and over 14 days, plus faulty device counts
- **Repairs completed today on home** — same-day closed tickets with customer, device, and engineer (via repair_snapshot + today_repair_lines)
- **Repair desk in analytics** — repair_snapshot and today_repair_lines mirrored from home
- **Repair exports** — reports pack and CSV for repair snapshot and today repairs

Phase 62: repair and service desk. DB stays 1.4.0.

## Phase 63

- **Compliance snapshot on home** — pending approvals, approvals reviewed today, audit events, and new customer counts
- **Audit activity today on home** — same-day audit log with action, user, and summary (via compliance_snapshot + today_audit_lines)
- **Compliance desk in analytics** — compliance_snapshot and today_audit_lines mirrored from home
- **Compliance exports** — reports pack and CSV for compliance snapshot and today audit

Phase 63: audit and compliance desk. DB stays 1.4.0.

## Phase 64

- **Trade snapshot on home** — wholesale and retail receivables, swap counts, and retail vs wholesale sales over 14 days
- **Swaps today on home** — same-day device swaps with customer and collected amounts (via trade_snapshot + today_swap_lines)
- **Trade desk in analytics** — trade_snapshot and today_swap_lines mirrored from home
- **Trade exports** — reports pack and CSV for trade snapshot and today swaps

Phase 64: wholesale and trade desk. DB stays 1.4.0.

## Phase 65

- **Aging snapshot on home** — receivable and payable aging buckets, 90+ totals, and 14-day payment mix collected
- **Receivable aging on home** — open customer invoices by bucket with deep links (via aging_snapshot + aging_lines)
- **Aging desk in analytics** — aging_snapshot and aging_lines mirrored from home
- **Aging exports** — reports pack and CSV for aging snapshot and receivable aging

Phase 65: aging and payment mix desk. DB stays 1.4.0.

## Phase 66

- **Executive snapshot on home** — consolidated KPIs from sales, cash, receivables, payables, operations, inventory, and alerts
- **Today sales on home** — same-day sales with invoice and customer links (via executive_snapshot + today_sales_lines)
- **Executive desk in analytics** — executive_snapshot mirrored from home
- **Executive exports** — reports pack and CSV for executive snapshot and today sales

Phase 66: executive overview desk. DB stays 1.4.0.

## Phase 67

- **Branch snapshot on home** — active branches, 14-day revenue, profit, collections, network stock, and top branch totals
- **Branch performance on home** — per-branch invoices, revenue, profit, and collection rate (via branch_snapshot + branch_lines)
- **Branch desk in analytics** — branch_snapshot and branch_lines mirrored from home
- **Branch exports** — reports pack and CSV for branch snapshot and branch comparison

Phase 67: branch network desk. DB stays 1.4.0.

## Phase 68

- **Mix snapshot on home** — 14-day payment methods collected, retail vs wholesale revenue, and total invoice counts
- **Payment & channel lines on home** — payment method and sale type breakdowns (via mix_snapshot + payment_mix_lines + sale_type_lines)
- **Mix desk in analytics** — mix_snapshot, payment_mix_lines, and sale_type_lines mirrored from home
- **Mix exports** — reports pack and CSV for mix snapshot, payment mix, and sale types

Phase 68: sales mix and channels desk. DB stays 1.4.0.

## Phase 69

- **Product snapshot on home** — top sellers over 14 days, best product profit, and slow mover counts with unit totals
- **Top products & slow movers on home** — ranked product profit and aged stock lines (via product_snapshot + top_product_lines + slow_lines)
- **Product desk in analytics** — product_snapshot, top_product_lines, and slow_lines mirrored from home
- **Product exports** — reports pack and CSV for product snapshot, top products, and slow movers

Phase 69: product performance desk. DB stays 1.4.0.

## Phase 70

- **Trend snapshot on home** — 14-day sales totals, active selling days, best day, average daily sales, and today’s sales
- **Daily trend on home** — day-by-day invoice, net, and collected lines (via trend_snapshot + trend_lines)
- **Trend desk in analytics** — trend_snapshot and trend_lines mirrored from home
- **Trend exports** — reports pack and CSV for trend snapshot and sales trend

Phase 70: sales trend and velocity desk. DB stays 1.4.0.

## Phase 71

- **Cashflow snapshot on home** — 14-day inflows, outflows, net cash, expenses, supplier payments, refunds, and today’s net cash
- **Cash detail on home** — 14-day and today cash buckets (via cashflow_snapshot + cash_snapshot + today_cash_snapshot)
- **Cashflow desk in analytics** — cashflow_snapshot, cash_snapshot, and today_cash_snapshot mirrored from home
- **Cashflow exports** — reports pack and CSV for cashflow snapshot and cash detail

Phase 71: cash flow desk. DB stays 1.4.0.

## Phase 72

- **Staff device snapshot on home** — devices sold over 14 days, staff count, top performer units, and today’s device sales with revenue
- **Staff device lines on home** — per-device sales attribution with staff, invoice, IMEI, and price (via staff_device_snapshot + staff_device_lines)
- **Staff device desk in analytics** — staff_device_snapshot and staff_device_lines mirrored from home
- **Staff device exports** — reports pack and CSV for staff device snapshot and staff devices

Phase 72: staff device sales desk. DB stays 1.4.0.

## Phase 73

- **Stock snapshot on home** — low stock alert count, available and faulty units, IMEI totals, and lowest available quantity
- **Low stock lines on home** — variant-level alerts with branch, available qty, and threshold (via stock_snapshot + low_stock_lines)
- **Stock desk in analytics** — stock_snapshot and low_stock_lines mirrored from home
- **Stock exports** — reports pack and CSV for stock snapshot and low stock alerts

Phase 73: low stock and replenishment desk. DB stays 1.4.0.

## Phase 74

- **IMEI snapshot on home** — on-hand totals by status, in-transit count, and registrations today
- **IMEI status lines on home** — branch IMEI breakdown by status (existing table, paired with snapshot cards)
- **IMEI desk in analytics** — imei_snapshot, imei_status_lines, and today_imei_lines mirrored from home
- **IMEI exports** — reports pack and CSV for IMEI snapshot, IMEI status, and today IMEIs

Phase 74: IMEI status desk. DB stays 1.4.0.

## Phase 75

- **Transfer snapshot on home** — in-transit and stuck counts, outbound/inbound queues, and today's dispatch/receive totals
- **Transit lines on home** — devices on the road and stuck transfers (via transfer_snapshot + transit_lines + stuck_transfer_lines)
- **Transfer desk in analytics** — transfer_snapshot, transit_lines, stuck_transfer_lines, and today_transfer_lines mirrored from home
- **Transfer exports** — reports pack and CSV for transfer snapshot, recent transfers, and today transfers

Phase 75: transfer and transit desk. DB stays 1.4.0.

## Phase 76

- **Purchase snapshot on home** — open PO count and value, pending units, ordered vs inspecting queues, and today's completed purchases
- **Open PO lines on home** — purchase orders awaiting receipt or IMEI registration (via purchase_snapshot + open_purchase_lines)
- **Purchase desk in analytics** — purchase_snapshot, open_purchase_lines, and today_purchase_lines mirrored from home
- **Purchase exports** — reports pack and CSV for purchase snapshot, recent purchases, and today purchases

Phase 76: purchase and open PO desk. DB stays 1.4.0.

## Phase 77

- **Returns snapshot on home** — today and 14-day return counts and refund totals, swap activity, and payment reversals or voids
- **Return lines on home** — recent customer returns and today's swap activity (via returns_snapshot + return_lines + today_swap_lines)
- **Returns desk in analytics** — returns_snapshot, return_lines, today_return_lines, and today_swap_lines mirrored from home
- **Returns exports** — reports pack and CSV for returns snapshot, recent returns, and today returns

Phase 77: returns and swaps desk. DB stays 1.4.0.

## Phase 78

- **Faulty snapshot on home** — faulty and stuck device counts, under-repair IMEIs, open and stuck repair tickets, and completion totals
- **Repair lines on home** — open repair queue and faulty device list (via faulty_snapshot + repair_lines + faulty_lines)
- **Repair desk in analytics** — faulty_snapshot, repair_lines, faulty_lines, and today_repair_lines mirrored from home
- **Repair exports** — reports pack and CSV for faulty snapshot, open repairs, and faulty devices

Phase 78: repair and faulty queue desk. DB stays 1.4.0.

## Phase 79

- **Customer snapshot on home** — new customer counts, customers owing, receivable total, overdue invoices, and retail vs wholesale balances
- **Customer lines on home** — top customer balances and recent sign-ups (via customer_snapshot + receivable_party_lines + today_customer_lines)
- **Customer desk in analytics** — customer_snapshot, receivable_party_lines, today_customer_lines, and recent_customer_lines mirrored from home
- **Customer exports** — reports pack and CSV for customer snapshot, recent customers, and today customers

Phase 79: customer and receivables desk. DB stays 1.4.0.

## Phase 80

- **Supplier snapshot on home** — suppliers owing, open and aged payables, open PO value, and today's supplier payments and returns
- **Payable lines on home** — top supplier balances and open purchase invoices (via supplier_snapshot + payable_party_lines + payable_lines)
- **Supplier desk in analytics** — supplier_snapshot, payable_party_lines, payable_lines, and today_supplier_payment_lines mirrored from home
- **Supplier exports** — reports pack and CSV for supplier snapshot, payables, and today supplier payments

Phase 80: supplier and payables desk. DB stays 1.4.0.

## Phase 81

- **Count snapshot on home** — open and pending-approval counts, open variance units, and posted today/14-day totals with missing units
- **Count lines on home** — open stock counts and recently posted counts (via count_snapshot + stock_count_lines + posted_stock_count_lines)
- **Count desk in analytics** — count_snapshot, stock_count_lines, posted_stock_count_lines, and today_stock_count_lines mirrored from home
- **Count exports** — reports pack and CSV for count snapshot, open stock counts, and today stock counts

Phase 81: stock count desk. DB stays 1.4.0.

## Phase 82

- **Approval snapshot on home** — pending queue by type, reviewed today/14-day totals, and approved vs rejected decisions today
- **Approval lines on home** — pending review queue and recently reviewed requests (via approval_snapshot + approval_lines + recent_approval_lines)
- **Approval desk in analytics** — approval_snapshot, approval_lines, recent_approval_lines, and today_approval_lines mirrored from home
- **Approval exports** — reports pack and CSV for approval snapshot, pending approvals, and today approvals

Phase 82: approvals desk. DB stays 1.4.0.

## Phase 83

- **Expense snapshot on home** — pending and posted totals, largest pending amount, and top category spend over 14 days
- **Expense lines on home** — pending queue, recently posted expenses, and today's posted expenses (via expense_snapshot + expense_lines + posted_expense_lines + today_expense_lines)
- **Expense desk in analytics** — expense_snapshot, expense_lines, posted_expense_lines, and today_expense_lines mirrored from home
- **Expense exports** — reports pack and CSV for expense snapshot, pending expenses, and today expenses

Phase 83: expense desk. DB stays 1.4.0.

## Phase 84

- **Audit snapshot on home** — today's and 14-day event counts, active users, entity-type breadth, and sales/approval/inventory activity mix
- **Audit lines on home** — recent audit trail and today's audit events (via audit_snapshot + audit_lines + today_audit_lines)
- **Audit desk in analytics** — audit_snapshot, audit_lines, and today_audit_lines mirrored from home
- **Audit exports** — reports pack and CSV for audit snapshot, recent audit, and today audit

Phase 84: audit trail desk. DB stays 1.4.0.

## Phase 85

- **Collection snapshot on home** — today's and 14-day collection totals, overdue invoices, and open receivable balances
- **Collection lines on home** — top customer balances, overdue invoices, and recent/today payments (via collection_snapshot + receivable_party_lines + overdue_lines + payment_lines + today_payment_lines)
- **Collection desk in analytics** — collection_snapshot, receivable_party_lines, overdue_lines, payment_lines, and today_payment_lines mirrored from home
- **Collection exports** — reports pack and CSV for collection snapshot, receivables, and today payments

Phase 85: collections desk. DB stays 1.4.0.

## Phase 86

- **Alert snapshot on home** — unread queue, today's and 14-day alert counts, and breakdown by stock, debt, approval, and operations types
- **Alert lines on home** — recent unread alerts and today's alerts (via alert_snapshot + notify_lines + today_notify_lines)
- **Alerts desk in analytics** — alert_snapshot, notify_lines, and today_notify_lines mirrored from home
- **Alert exports** — reports pack and CSV for alert snapshot, today alerts, and unread alerts

Phase 86: alerts desk. DB stays 1.4.0.

## Phase 87

- **Sales snapshot on home** — today's and 14-day invoice totals, collected vs due amounts, retail vs wholesale mix, and voided sales today
- **Sales lines on home** — recent and today's posted invoices plus voided sales (via sales_snapshot + sale_lines + today_sales_lines + voided_lines + today_voided_lines)
- **Sales desk in analytics** — sales_snapshot, sale_lines, today_sales_lines, voided_lines, and today_voided_lines mirrored from home
- **Sales exports** — reports pack and CSV for sales snapshot, recent sales, and today sales

Phase 87: sales desk. DB stays 1.4.0.

## Phase 88

- **Payment snapshot on home** — today's and 14-day customer and supplier payment totals, plus reversal counts and amounts
- **Payment lines on home** — recent and today's customer payments, supplier payments, and reversals (via payment_snapshot + payment_lines + today_payment_lines + supplier_payment_lines + today_supplier_payment_lines + reversal_lines + today_reversal_lines)
- **Payments desk in analytics** — payment_snapshot, payment_lines, today_payment_lines, supplier_payment_lines, today_supplier_payment_lines, reversal_lines, and today_reversal_lines mirrored from home
- **Payment exports** — reports pack and CSV for payment snapshot, recent payments, and today payments

Phase 88: payments desk. DB stays 1.4.0.

## Phase 89

- **Swap snapshot on home** — today's and 14-day swap counts, collected amounts, price differences, and upgrade/downgrade/even mix
- **Swap lines on home** — recent and today's device swaps (via swap_snapshot + swap_lines + today_swap_lines)
- **Swap desk in analytics** — swap_snapshot, swap_lines, and today_swap_lines mirrored from home
- **Swap exports** — reports pack and CSV for swap snapshot, recent swaps, and today swaps

Phase 89: swap desk. DB stays 1.4.0.

## Phase 90

- **Return snapshot on home** — today's and 14-day return counts and refund totals, plus resolution and return-type mix
- **Return lines on home** — recent and today's customer returns (via return_snapshot + return_lines + today_return_lines)
- **Return desk in analytics** — return_snapshot, return_lines, and today_return_lines mirrored from home
- **Return exports** — reports pack and CSV for return snapshot, recent returns, and today returns

Phase 90: return desk. DB stays 1.4.0.

## Phase 91

- **Adjustment snapshot on home** — today's and 14-day payment reversals and voided sales, plus combined adjustment totals
- **Adjustment lines on home** — recent and today's reversals and voided sales (via adjustment_snapshot + reversal_lines + today_reversal_lines + voided_lines + today_voided_lines)
- **Adjustments desk in analytics** — adjustment_snapshot, reversal_lines, today_reversal_lines, voided_lines, and today_voided_lines mirrored from home
- **Adjustment exports** — reports pack and CSV for adjustment snapshot, today reversals, and today voided sales

Phase 91: adjustments desk. DB stays 1.4.0.

## Phase 92

- **Procurement snapshot on home** — open PO pipeline, today's completed purchases, and 14-day purchase totals with units received
- **Procurement lines on home** — open, recent, and today's purchase lines (via procurement_snapshot + open_purchase_lines + purchase_lines + today_purchase_lines)
- **Procurement desk in analytics** — procurement_snapshot, open_purchase_lines, purchase_lines, and today_purchase_lines mirrored from home
- **Procurement exports** — reports pack and CSV for procurement snapshot, recent purchases, and today purchases

Phase 92: procurement desk. DB stays 1.4.0.

## Phase 93

- **Receiving snapshot on home** — today's and 14-day purchases, IMEI registrations, supplier payments, swaps, and supplier returns with combined receiving event counts
- **Receiving lines on home** — recent and today's intake lines (via receiving_snapshot + purchase_lines + today_purchase_lines + recent_imei_lines + today_imei_lines + supplier_payment_lines + today_supplier_payment_lines + swap_lines + today_swap_lines + supplier_return_lines + today_supplier_return_lines)
- **Receiving desk in analytics** — receiving_snapshot and intake line keys mirrored from home
- **Receiving exports** — reports pack and CSV for receiving snapshot, today IMEIs, and today supplier payments

Phase 93: receiving desk. DB stays 1.4.0.

## Phase 94

- **Payable snapshot on home** — suppliers owing, open and aged payables, open POs, and today/14-day supplier payments and returns
- **Payable lines on home** — supplier balances, open invoices, and payment/return lines (via payable_snapshot + payable_party_lines + payable_lines + supplier_payment_lines + today_supplier_payment_lines + supplier_return_lines + today_supplier_return_lines)
- **Payables desk in analytics** — payable_snapshot and supplier ledger line keys mirrored from home
- **Payable exports** — reports pack and CSV for payable snapshot, payables balances, and supplier payments

Phase 94: payables desk. DB stays 1.4.0.

## Phase 95

- **Receivable snapshot on home** — customers owing, overdue and open invoices, retail/wholesale mix, new customer sign-ups, and today/14-day collections
- **Receivable lines on home** — customer balances, overdue invoices, and payment lines (via receivable_snapshot + receivable_party_lines + overdue_lines + payment_lines + today_payment_lines + recent_customer_lines + today_customer_lines)
- **Receivables desk in analytics** — receivable_snapshot and customer ledger line keys mirrored from home
- **Receivable exports** — reports pack and CSV for receivable snapshot, receivables balances, and today payments

Phase 95: receivables desk. DB stays 1.4.0.

## Phase 96

- **Workflow snapshot on home** — open repair, approval, transit, stock count, and faulty queues with stuck counts plus today/14-day completed workflow activity
- **Workflow lines on home** — open and stuck workflow lines (via workflow_snapshot + repair_lines + stuck_repair_lines + transit_lines + stuck_transfer_lines + approval_lines + stock_count_lines + expense_lines + today_repair_lines + today_transfer_lines + today_approval_lines + today_stock_count_lines + today_expense_lines)
- **Workflow desk in analytics** — workflow_snapshot and operations line keys mirrored from home
- **Workflow exports** — reports pack and CSV for workflow snapshot, today repairs, and today transfers

Phase 96: workflow desk. DB stays 1.4.0.

## Phase 97

- **Transit snapshot on home** — in-transit and stuck transfer pipeline with outbound/inbound split plus today and 14-day dispatch and receive activity
- **Transit lines on home** — live and recent transfer lines (via transit_snapshot + transit_lines + stuck_transfer_lines + recent_transfer_lines + today_transfer_lines)
- **Transit desk in analytics** — transit_snapshot and transfer line keys mirrored from home
- **Transit exports** — reports pack and CSV for transit snapshot, recent transfers, and today transfers

Phase 97: transit desk. DB stays 1.4.0.

## Phase 98

- **Stockflow snapshot on home** — available and on-hand valuation, low-stock alerts, faulty units, IMEI on-hand counts, and 14-day IMEI registration plus slow-mover totals
- **Stockflow lines on home** — top inventory, low-stock alerts, IMEI status, and recent/today IMEI lines (via stockflow_snapshot + inventory_lines + low_stock + imei_status_lines + recent_imei_lines + today_imei_lines)
- **Stockflow desk in analytics** — stockflow_snapshot and inventory/IMEI line keys mirrored from home
- **Stockflow exports** — reports pack and CSV for stockflow snapshot, low stock, and today IMEIs

Phase 98: stockflow desk. DB stays 1.4.0.

## Phase 99

- **Service snapshot on home** — open and stuck repair pipeline, faulty-device queue, today and 14-day repair completion and intake, plus return activity
- **Service lines on home** — open/stuck repair and faulty lines plus recent completions (via service_snapshot + repair_lines + stuck_repair_lines + faulty_lines + stuck_faulty_lines + completed_repair_lines + today_repair_lines)
- **Service desk in analytics** — service_snapshot and repair/faulty line keys mirrored from home
- **Service exports** — reports pack and CSV for service snapshot, open repairs, and today repairs

Phase 99: service desk. DB stays 1.4.0.

## Phase 100

- **Countflow snapshot on home** — open and pending stock counts, missing/extra variance units, approval backlog, and today plus 14-day posted count activity
- **Countflow lines on home** — open, posted, and today stock-count lines (via countflow_snapshot + stock_count_lines + posted_stock_count_lines + today_stock_count_lines)
- **Countflow desk in analytics** — countflow_snapshot and stock-count line keys mirrored from home
- **Countflow exports** — reports pack and CSV for countflow snapshot, open stock counts, and today stock counts

Phase 100: countflow desk. DB stays 1.4.0.

## Phase 101

- **Approvalflow snapshot on home** — pending approvals by type, today and 14-day review outcomes with approved/rejected split
- **Approvalflow lines on home** — pending, recent, and today approval lines (via approvalflow_snapshot + approval_lines + recent_approval_lines + today_approval_lines)
- **Approvalflow desk in analytics** — approvalflow_snapshot and approval line keys mirrored from home
- **Approvalflow exports** — reports pack and CSV for approvalflow snapshot, pending approvals, and today approvals

Phase 101: approvalflow desk. DB stays 1.4.0. Plugin version **2.0.0**.

## Phase 102

- **Auditflow snapshot on home** — today and 14-day audit event volume, active users, and sales/payment/inventory/transfer event splits plus top action
- **Auditflow lines on home** — recent and today audit lines (via auditflow_snapshot + audit_lines + today_audit_lines)
- **Auditflow desk in analytics** — auditflow_snapshot and audit line keys mirrored from home
- **Auditflow exports** — reports pack and CSV for auditflow snapshot, recent audit, and today audit

Phase 102: auditflow desk. DB stays 1.4.0.

## Phase 103

- **Collectionflow snapshot on home** — receivable totals, overdue share, open invoices, and today plus 14-day collection counts with average payment size
- **Collectionflow lines on home** — customer balances, overdue invoices, and recent/today payment lines (via collectionflow_snapshot + receivable_party_lines + overdue_lines + payment_lines + today_payment_lines)
- **Collectionflow desk in analytics** — collectionflow_snapshot and receivable/payment line keys mirrored from home
- **Collectionflow exports** — reports pack and CSV for collectionflow snapshot, recent payments, and today payments

Phase 103: collectionflow desk. DB stays 1.4.0.

## Phase 104

- **Alertflow snapshot on home** — unread backlog, today read/unread split, active alert types, and 14-day low-stock, debt, approval, and operations alert counts
- **Alertflow lines on home** — inbox and today alert lines (via alertflow_snapshot + notify_lines + today_notify_lines)
- **Alertflow desk in analytics** — alertflow_snapshot and notification line keys mirrored from home
- **Alertflow exports** — reports pack and CSV for alertflow snapshot, unread alerts, and today alerts

Phase 104: alertflow desk. DB stays 1.4.0.

## Phase 105

- **Expenseflow snapshot on home** — pending and approval-queue totals, largest pending amount, today and 14-day posted spend with averages, plus top category
- **Expenseflow lines on home** — pending, posted, and today expense lines (via expenseflow_snapshot + expense_lines + posted_expense_lines + today_expense_lines)
- **Expenseflow desk in analytics** — expenseflow_snapshot and expense line keys mirrored from home
- **Expenseflow exports** — reports pack and CSV for expenseflow snapshot, pending expenses, and today expenses

Phase 105: expenseflow desk. DB stays 1.4.0.

## Phase 106

- **Performanceflow snapshot on home** — low stock and slow mover counts with unit totals, 14-day top seller revenue, and lead product name with units, revenue, and profit
- **Performanceflow lines on home** — slow mover, top product, and low stock lines (via performanceflow_snapshot + slow_lines + top_product_lines + low_stock)
- **Performanceflow desk in analytics** — performanceflow_snapshot and performance line keys mirrored from home
- **Performanceflow exports** — reports pack and CSV for performanceflow snapshot, slow movers, and top products

Phase 106: performanceflow desk. DB stays 1.4.0.

## Phase 107

- **Customerflow snapshot on home** — new customer counts, owing balances with average, overdue share, open invoices, and today/14-day collections
- **Customerflow lines on home** — recent customers, retail receivables, and overdue lines (via customerflow_snapshot + recent_customer_lines + retail_receivable_lines + overdue_lines)
- **Customerflow desk in analytics** — customerflow_snapshot and customer line keys mirrored from home
- **Customerflow exports** — reports pack and CSV for customerflow snapshot, recent customers, and retail receivables

Phase 107: customerflow desk. DB stays 1.4.0.

## Phase 108

- **Intakeflow snapshot on home** — today and 14-day purchases with averages, IMEI registrations, swaps, supplier payments/returns, and total intake event counts
- **Intakeflow lines on home** — today purchase, IMEI, and supplier payment lines (via intakeflow_snapshot + today_purchase_lines + today_imei_lines + today_supplier_payment_lines)
- **Intakeflow desk in analytics** — intakeflow_snapshot and intake line keys mirrored from home
- **Intakeflow exports** — reports pack and CSV for intakeflow snapshot, today purchases, and today IMEIs

Phase 108: intakeflow desk. DB stays 1.4.0.

## Phase 109

- **Supplierflow snapshot on home** — suppliers owing with average balance, aged payable share, open POs, and today/14-day supplier payments and returns
- **Supplierflow lines on home** — payable, open purchase, and supplier payment lines (via supplierflow_snapshot + payable_lines + open_purchase_lines + supplier_payment_lines)
- **Supplierflow desk in analytics** — supplierflow_snapshot and supplier line keys mirrored from home
- **Supplierflow exports** — reports pack and CSV for supplierflow snapshot, payables, and supplier payments

Phase 109: supplierflow desk. DB stays 1.4.0.

## Phase 110

- **Inventoryflow snapshot on home** — available stock with average unit value, on-hand and faulty share, low stock alerts, and IMEI status breakdown
- **Inventoryflow lines on home** — inventory valuation, IMEI status, and low stock lines (via inventoryflow_snapshot + inventory_lines + imei_status_lines + low_stock)
- **Inventoryflow desk in analytics** — inventoryflow_snapshot and inventory line keys mirrored from home
- **Inventoryflow exports** — reports pack and CSV for inventoryflow snapshot, inventory, and low stock

Phase 110: inventoryflow desk. DB stays 1.4.0.

## Phase 111

- **Staffflow snapshot on home** — 14-day staff and branch performance with average revenue, collection rates, top staff name, and today device/sales counts
- **Staffflow lines on home** — staff sales, staff device, and branch lines (via staffflow_snapshot + staff_sales_lines + staff_device_lines + branch_lines)
- **Staffflow desk in analytics** — staffflow_snapshot and staff line keys mirrored from home
- **Staffflow exports** — reports pack and CSV for staffflow snapshot, staff sales, and staff devices

Phase 111: staffflow desk. DB stays 1.4.0.

## Phase 112

- **Branchflow snapshot on home** — active branch counts, 14-day revenue and collection rates, top branch name with profit, network stock, and due share
- **Branchflow lines on home** — branch performance, recent sales, and today sales lines (via branchflow_snapshot + branch_lines + sale_lines + today_sales_lines)
- **Branchflow desk in analytics** — branchflow_snapshot and branch line keys mirrored from home
- **Branchflow exports** — reports pack and CSV for branchflow snapshot, branches, and today sales

Phase 112: branchflow desk. DB stays 1.4.0.

## Phase 113

- **Cashflowflow snapshot on home** — 14-day cash in/out with average daily inflow, collection share, top payment method, and today expense/outflow breakdown
- **Cashflowflow lines on home** — payment mix, today payments, and today cash snapshot (via cashflowflow_snapshot + payment_mix_lines + today_payment_lines + today_cash_snapshot)
- **Cashflowflow desk in analytics** — cashflowflow_snapshot and cash line keys mirrored from home
- **Cashflowflow exports** — reports pack and CSV for cashflowflow snapshot, payment mix, and today payments

Phase 113: cashflowflow desk. DB stays 1.4.0.

## Phase 114

- **Mixflow snapshot on home** — 14-day payment and channel mix with retail/wholesale share, top payment method share, average invoice value, and today sales breakdown
- **Mixflow lines on home** — payment mix, sale type lines, and today sales (via mixflow_snapshot + payment_mix_lines + sale_type_lines + today_sales_lines)
- **Mixflow desk in analytics** — mixflow_snapshot and mix line keys mirrored from home
- **Mixflow exports** — reports pack and CSV for mixflow snapshot, payment mix, and sale types

Phase 114: mixflow desk. DB stays 1.4.0.

## Phase 115

- **Trendflow snapshot on home** — 14-day sales velocity with collection rate, best-day share, today vs average, and 7-day momentum change
- **Trendflow lines on home** — daily trend, recent sales, and today sales (via trendflow_snapshot + trend_lines + sale_lines + today_sales_lines)
- **Trendflow desk in analytics** — trendflow_snapshot and trend line keys mirrored from home
- **Trendflow exports** — reports pack and CSV for trendflow snapshot, sales trend, and today sales

Phase 115: trendflow desk. DB stays 1.4.0.

## Phase 116

- **Productflow snapshot on home** — 14-day top seller performance with profit margin, top product share, unit economics, slow mover share, and low stock alerts
- **Productflow lines on home** — top products, slow movers, and low stock (via productflow_snapshot + top_product_lines + slow_lines + low_stock)
- **Productflow desk in analytics** — productflow_snapshot and product line keys mirrored from home
- **Productflow exports** — reports pack and CSV for productflow snapshot, top products, and slow movers

Phase 116: productflow desk. DB stays 1.4.0.

## Phase 117

- **Ledgerflow snapshot on home** — receivable/payable totals with net position, overdue share, collection rate, average balances, and today cash in/out
- **Ledgerflow lines on home** — customer/supplier party balances and cash snapshot (via ledgerflow_snapshot + receivable_party_lines + payable_party_lines + cash_snapshot)
- **Ledgerflow desk in analytics** — ledgerflow_snapshot and ledger line keys mirrored from home
- **Ledgerflow exports** — reports pack and CSV for ledgerflow snapshot, receivables, and payables

Phase 117: ledgerflow desk. DB stays 1.4.0.

## Phase 118

- **Executiveflow snapshot on home** — branch overview with net position, collection rate, today vs 14-day average, operations load, and alert load
- **Executiveflow lines on home** — today sales, overdue invoices, and alert lines (via executiveflow_snapshot + today_sales_lines + overdue_lines + notify_lines)
- **Executiveflow desk in analytics** — executiveflow_snapshot and executive line keys mirrored from home
- **Executiveflow exports** — reports pack and CSV for executiveflow snapshot, today sales, and unread alerts

Phase 118: executiveflow desk. DB stays 1.4.0.

## Phase 119

- **Agingflow snapshot on home** — receivable/payable aging with stale totals, bucket share percentages, net aging position, and 14-day collection context
- **Agingflow lines on home** — receivable aging, payable aging, and payment mix lines (via agingflow_snapshot + aging_lines + payable_aging_lines + payment_mix_lines)
- **Agingflow desk in analytics** — agingflow_snapshot and aging line keys mirrored from home
- **Agingflow exports** — reports pack and CSV for agingflow snapshot, receivable aging, and payable aging

Phase 119: agingflow desk. DB stays 1.4.0.

## Phase 120

- **Tradeflow snapshot on home** — wholesale/retail owing totals with channel share, total owing, swap collection metrics, and 14-day sales mix
- **Tradeflow lines on home** — wholesale receivables, retail receivables, and swap lines (via tradeflow_snapshot + wholesale_receivable_lines + retail_receivable_lines + swap_lines)
- **Tradeflow desk in analytics** — tradeflow_snapshot and trade line keys mirrored from home
- **Tradeflow exports** — reports pack and CSV for tradeflow snapshot, wholesale receivables, and retail receivables

Phase 120: tradeflow desk. DB stays 1.4.0.
