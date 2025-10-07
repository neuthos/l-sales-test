"use client";

import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {ProtectedRoute} from "@/components/ProtectedRoute";
import {Input} from "@/components/ui/Input";
import {DatePicker} from "@/components/ui/DatePicker";
import {TimePicker} from "@/components/ui/TimePicker";

export default function Dashboard() {
  // Form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [priceJPY, setPriceJPY] = React.useState<number | null>(1500000);
  const [priceUSD, setPriceUSD] = React.useState<number | null>(99.99);
  const [priceEUR, setPriceEUR] = React.useState<number | null>(85.5);
  const [priceIDR, setPriceIDR] = React.useState<number | null>(150000);

  const [quantity, setQuantity] = React.useState<number | null>(1234);
  const [stockQty, setStockQty] = React.useState<number | null>(5000);

  const [discount, setDiscount] = React.useState<number | null>(15.5);
  const [taxRate, setTaxRate] = React.useState<number | null>(10);

  // DatePicker states
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [dateISO, setDateISO] = React.useState<string | null>(
    dayjs().toISOString()
  );

  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs());
  const [dateTimeISO, setDateTimeISO] = React.useState<string | null>(
    dayjs().toISOString()
  );

  const [dateRange, setDateRange] = React.useState<
    [Dayjs | null, Dayjs | null]
  >([dayjs(), dayjs().add(7, "day")]);
  const [dateRangeISO, setDateRangeISO] = React.useState<
    [string | null, string | null]
  >([dayjs().toISOString(), dayjs().add(7, "day").toISOString()]);

  const [time, setTime] = React.useState<Dayjs | null>(
    dayjs().hour(14).minute(30)
  );
  const [timeISO, setTimeISO] = React.useState<string | null>(
    dayjs().hour(14).minute(30).toISOString()
  );

  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Input Components Test</h1>
          <p className="text-muted-foreground mt-2">
            Test all input variants with interactive formatting
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Base Input */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">1. Base Input</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                data-test="input-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                Value: {name || "(empty)"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                data-test="input-email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">
                Value: {email || "(empty)"}
              </p>
            </div>
          </div>

          {/* TextArea */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">2. TextArea</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input.TextArea
                data-test="textarea-description"
                placeholder="Enter a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <p className="text-muted-foreground text-xs">
                Characters: {description.length}
              </p>
            </div>
          </div>

          {/* Currency Inputs */}
          <div className="space-y-4 rounded-lg border p-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">3. Currency Input</h2>
            <p className="text-muted-foreground text-sm">
              Type freely, auto-formats when you blur (click away). Try typing
              1234.56 for USD/EUR
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price (JPY - Default)
                </label>
                <Input.Currency
                  data-test="currency-jpy"
                  currency="JPY"
                  placeholder="0"
                  value={priceJPY}
                  onChange={setPriceJPY}
                />
                <p className="text-muted-foreground text-xs">
                  Raw: {priceJPY !== null ? priceJPY : "null"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (USD)</label>
                <Input.Currency
                  data-test="currency-usd"
                  currency="USD"
                  placeholder="0.00"
                  value={priceUSD}
                  onChange={setPriceUSD}
                />
                <p className="text-muted-foreground text-xs">
                  Raw: {priceUSD !== null ? priceUSD : "null"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (EUR)</label>
                <Input.Currency
                  data-test="currency-eur"
                  currency="EUR"
                  placeholder="0,00"
                  value={priceEUR}
                  onChange={setPriceEUR}
                />
                <p className="text-muted-foreground text-xs">
                  Raw: {priceEUR !== null ? priceEUR : "null"}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (IDR)</label>
                <Input.Currency
                  data-test="currency-idr"
                  currency="IDR"
                  placeholder="0"
                  value={priceIDR}
                  onChange={setPriceIDR}
                />
                <p className="text-muted-foreground text-xs">
                  Raw: {priceIDR !== null ? priceIDR : "null"}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Inputs */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">4. Quantity Input</h2>
            <p className="text-muted-foreground text-sm">
              Integer only with thousand separators. Formats as you type.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Quantity</label>
              <Input.Quantity
                data-test="quantity-order"
                placeholder="0"
                value={quantity}
                onChange={setQuantity}
                min={1}
              />
              <p className="text-muted-foreground text-xs">
                Raw: {quantity !== null ? quantity : "null"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Quantity</label>
              <Input.Quantity
                data-test="quantity-stock"
                placeholder="0"
                value={stockQty}
                onChange={setStockQty}
                min={0}
              />
              <p className="text-muted-foreground text-xs">
                Raw: {stockQty !== null ? stockQty : "null"}
              </p>
            </div>
          </div>

          {/* Percentage Inputs */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">5. Percentage Input</h2>
            <p className="text-muted-foreground text-sm">
              Type freely (0-100), auto-formats with % when you blur. Try 15.75
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Rate</label>
              <Input.Percentage
                data-test="percentage-discount"
                placeholder="0.00"
                value={discount}
                onChange={setDiscount}
                min={0}
                max={100}
                decimals={2}
              />
              <p className="text-muted-foreground text-xs">
                Raw: {discount !== null ? discount : "null"}%
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tax Rate</label>
              <Input.Percentage
                className="w-[120px]"
                data-test="percentage-tax"
                placeholder="0.00"
                value={taxRate}
                onChange={setTaxRate}
                min={0}
                max={100}
                decimals={2}
              />
              <p className="text-muted-foreground text-xs">
                Raw: {taxRate !== null ? taxRate : "null"}%
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4 rounded-lg border bg-muted/50 p-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">Form Summary</h2>
            <div className="grid gap-2 text-sm lg:grid-cols-2">
              <div>
                <strong>Name:</strong> {name || "(empty)"}
              </div>
              <div>
                <strong>Email:</strong> {email || "(empty)"}
              </div>
              <div className="lg:col-span-2">
                <strong>Description:</strong> {description || "(empty)"}
              </div>
              <div>
                <strong>Price JPY:</strong> ¥
                {priceJPY?.toLocaleString("ja-JP") || "0"}
              </div>
              <div>
                <strong>Price USD:</strong> ${priceUSD?.toFixed(2) || "0.00"}
              </div>
              <div>
                <strong>Price EUR:</strong> €{priceEUR?.toFixed(2) || "0.00"}
              </div>
              <div>
                <strong>Price IDR:</strong> Rp
                {priceIDR?.toLocaleString("id-ID") || "0"}
              </div>
              <div>
                <strong>Order Qty:</strong> {quantity?.toLocaleString() || "0"}
              </div>
              <div>
                <strong>Stock Qty:</strong> {stockQty?.toLocaleString() || "0"}
              </div>
              <div>
                <strong>Discount:</strong>{" "}
                {discount !== null ? discount.toFixed(2) : "0.00"}%
              </div>
              <div>
                <strong>Tax Rate:</strong>{" "}
                {taxRate !== null ? taxRate.toFixed(2) : "0.00"}%
              </div>
            </div>
          </div>
        </div>

        {/* Feature Notes - Input */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 font-semibold">✨ Input Components</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>
              • <strong>Currency & Percentage:</strong> Type freely,
              auto-formats when you blur (tab/click away)
            </li>
            <li>
              • <strong>Quantity:</strong> Formats as you type with thousand
              separators (1,234)
            </li>
            <li>
              • <strong>Percentage:</strong> Auto-constrains to 0-100 range on
              blur
            </li>
            <li>
              • <strong>Focus behavior:</strong> Click into Currency/Percentage
              to see raw numbers for easy editing
            </li>
            <li>
              • <strong>Default Currency:</strong> JPY (Japanese Yen) with 0
              decimals
            </li>
          </ul>
        </div>

        {/* Separator */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-bold">
            DatePicker & TimePicker Components
          </h2>
          <p className="text-muted-foreground mt-2">
            Test DatePicker, DatePicker with time, DatePicker.Range, and
            TimePicker
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* DatePicker - Basic */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">6. DatePicker (Basic)</h2>
            <p className="text-muted-foreground text-sm">
              Select a date (no time)
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <DatePicker
                data-test="datepicker-basic"
                value={date}
                onChange={(dayjs, iso8601) => {
                  setDate(dayjs);
                  setDateISO(iso8601);
                }}
                placeholder="Pick a date"
              />
              <div className="bg-muted rounded-md p-3 text-sm">
                <div>
                  <strong>Dayjs:</strong>
                </div>
                <code className="text-xs">
                  {date ? date.format("YYYY-MM-DD HH:mm:ss") : "null"}
                </code>
                <div className="mt-2">
                  <strong>ISO8601:</strong>
                </div>
                <code className="text-xs break-all">{dateISO || "null"}</code>
              </div>
            </div>
          </div>

          {/* DatePicker - With Time */}
          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-xl font-semibold">7. DatePicker (With Time)</h2>
            <p className="text-muted-foreground text-sm">
              Select date and time using withTime prop
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date & Time</label>
              <DatePicker
                data-test="datepicker-with-time"
                value={dateTime}
                onChange={(dayjs, iso8601) => {
                  setDateTime(dayjs);
                  setDateTimeISO(iso8601);
                }}
                placeholder="Pick date and time"
                withTime
              />
              <div className="bg-muted rounded-md p-3 text-sm">
                <div>
                  <strong>Dayjs:</strong>
                </div>
                <code className="text-xs">
                  {dateTime ? dateTime.format("YYYY-MM-DD HH:mm:ss") : "null"}
                </code>
                <div className="mt-2">
                  <strong>ISO8601:</strong>
                </div>
                <code className="text-xs break-all">
                  {dateTimeISO || "null"}
                </code>
              </div>
            </div>
          </div>

          {/* DatePicker.Range */}
          <div className="space-y-4 rounded-lg border p-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">8. DatePicker.Range</h2>
            <p className="text-muted-foreground text-sm">Select a date range</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date Range</label>
              <DatePicker.Range
                data-test="datepicker-range"
                value={{start: dateRange[0], end: dateRange[1]}}
                onChange={(dayjs, iso8601) => {
                  setDateRange(dayjs);
                  setDateRangeISO(iso8601);
                }}
                placeholder="Pick a date range"
              />
              <div className="bg-muted rounded-md p-3 text-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="mb-1 font-semibold">Start Date:</div>
                    <div>
                      <strong>Dayjs:</strong>
                    </div>
                    <code className="text-xs">
                      {dateRange[0]
                        ? dateRange[0].format("YYYY-MM-DD HH:mm:ss")
                        : "null"}
                    </code>
                    <div className="mt-1">
                      <strong>ISO8601:</strong>
                    </div>
                    <code className="text-xs break-all">
                      {dateRangeISO[0] || "null"}
                    </code>
                  </div>
                  <div>
                    <div className="mb-1 font-semibold">End Date:</div>
                    <div>
                      <strong>Dayjs:</strong>
                    </div>
                    <code className="text-xs">
                      {dateRange[1]
                        ? dateRange[1].format("YYYY-MM-DD HH:mm:ss")
                        : "null"}
                    </code>
                    <div className="mt-1">
                      <strong>ISO8601:</strong>
                    </div>
                    <code className="text-xs break-all">
                      {dateRangeISO[1] || "null"}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TimePicker */}
          <div className="space-y-4 rounded-lg border p-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">9. TimePicker</h2>
            <p className="text-muted-foreground text-sm">
              Select time only (hours and minutes)
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <TimePicker
                data-test="timepicker"
                value={time}
                onChange={(dayjs, iso8601) => {
                  setTime(dayjs);
                  setTimeISO(iso8601);
                }}
                placeholder="Select time"
                className="w-[200px]"
              />
              <div className="bg-muted rounded-md p-3 text-sm">
                <div>
                  <strong>Dayjs:</strong>
                </div>
                <code className="text-xs">
                  {time ? time.format("YYYY-MM-DD HH:mm:ss") : "null"}
                </code>
                <div className="mt-2">
                  <strong>ISO8601:</strong>
                </div>
                <code className="text-xs break-all">{timeISO || "null"}</code>
                <div className="mt-2">
                  <strong>Time only:</strong>
                </div>
                <code className="text-xs">
                  {time ? time.format("HH:mm") : "null"}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Notes - DatePicker */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 font-semibold">✨ DatePicker Components</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>
              • <strong>DatePicker:</strong> Auto-closes on date selection (Ant
              Design behavior)
            </li>
            <li>
              • <strong>withTime prop:</strong> Requires button confirmation
              (like Ant Design DateTimePicker)
            </li>
            <li>
              • <strong>DatePicker.Range:</strong> Includes preset ranges
              (Today, Last 7 days, Last 30 days, etc.)
            </li>
            <li>
              • <strong>Preset ranges:</strong> Quick selection for common date
              ranges (This month, Last month, etc.)
            </li>
            <li>
              • <strong>TimePicker:</strong> Select time only (hours and
              minutes)
            </li>
            <li>
              • <strong>Return format:</strong> Returns (dayjs, iso8601) as
              separate parameters
            </li>
            <li>
              • <strong>Value format:</strong> Accepts either Dayjs object or
              ISO8601 string
            </li>
            <li>
              • <strong>Built with:</strong> react-day-picker, Radix UI, dayjs
            </li>
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
}
