
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** zorvynFinancialDashboard
- **Date:** 2026-04-03
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Dashboard loads and shows primary overview content
- **Test Code:** [TC001_Dashboard_loads_and_shows_primary_overview_content.py](./TC001_Dashboard_loads_and_shows_primary_overview_content.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/e210a1d7-4a2e-4a7a-8331-bb6e90d89986
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Dashboard spending donut chart shows tooltip on slice hover
- **Test Code:** [TC002_Dashboard_spending_donut_chart_shows_tooltip_on_slice_hover.py](./TC002_Dashboard_spending_donut_chart_shows_tooltip_on_slice_hover.py)
- **Test Error:** Hovering a donut slice did not reveal contextual tooltip details.

Observations:
- The Dashboard loaded and the 'Spending by Category' donut chart is visible.
- The donut chart SVG (index 247) was clicked but no tooltip or slice details appeared.
- The 'Food' legend item (index 291) was clicked but no tooltip or contextual details appeared.
- No tooltip or slice detail content is visible on the page after interactions.
- Other page content (e.g., Recent Transactions) remains visible, indicating the page is still rendered.

The requested hover-tooltips feature appears to be absent or not functioning based on these interactions.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/83d49bd7-ce16-4295-b892-a7be735b71bb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Dashboard balance trend chart renders historical trend visualization
- **Test Code:** [TC003_Dashboard_balance_trend_chart_renders_historical_trend_visualization.py](./TC003_Dashboard_balance_trend_chart_renders_historical_trend_visualization.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/017adfca-59da-40ee-9c7d-1066b56360aa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Dashboard handles empty or low-data state with guidance
- **Test Code:** [TC004_Dashboard_handles_empty_or_low_data_state_with_guidance.py](./TC004_Dashboard_handles_empty_or_low_data_state_with_guidance.py)
- **Test Error:** An empty or low-data state with guidance to add transactions was not found on the dashboard. The dashboard instead displays populated totals, charts, and a recent transactions list.

Observations:
- Total Balance, Total Income, and Total Expenses show populated numeric values (e.g., ₹4,33,389; ₹5,88,550; ₹1,55,161).
- A Balance Trend chart is visible with plotted points spanning Nov–Apr.
- A Spending by Category donut chart is displayed showing a total (₹1,55,161) and category segments.
- Recent Transactions lists several entries with dates, descriptions, categories, and amounts (e.g., Zomato Order ₹450, Salary Credit ₹90,000).
- No empty/placeholder message, "no data" indicator, or guidance prompt (for example, text prompting to add transactions) was visible on the dashboard.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/aa636285-bcfc-4001-991d-bf7a1e0badcc
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Transactions page allows creating a new transaction end-to-end
- **Test Code:** [TC005_Transactions_page_allows_creating_a_new_transaction_end_to_end.py](./TC005_Transactions_page_allows_creating_a_new_transaction_end_to_end.py)
- **Test Error:** Adding the transaction failed because the app rejected the decimal amount and the transaction was not created.

Observations:
- After clicking Add Transaction, the Add Transaction modal remained open instead of closing.
- The Amount field displayed a validation tooltip: "Please enter a valid value. The two nearest valid values are 42 and 43." indicating 42.35 was rejected.
- The Amount input is marked invalid and appears to accept only whole-number values (nearest valid values shown are 42 and 43).
- The transactions list (visible behind the modal) does not contain an entry titled "Groceries E2E".
- Description and Date fields were filled as expected, but submission did not complete due to amount validation.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/fde119c1-c440-40d5-b3a7-d7d1f0ce9935
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Transactions create flow shows validation then allows correction and save
- **Test Code:** [TC006_Transactions_create_flow_shows_validation_then_allows_correction_and_save.py](./TC006_Transactions_create_flow_shows_validation_then_allows_correction_and_save.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/c2b2ba59-c1c3-4646-b73f-6ea7c11dffdf
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Edit an existing transaction and see updated values in the list
- **Test Code:** [TC007_Edit_an_existing_transaction_and_see_updated_values_in_the_list.py](./TC007_Edit_an_existing_transaction_and_see_updated_values_in_the_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/0127ab3e-3cfe-4cfa-96e2-17a96daf6b73
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Edit flow blocks invalid data and cancel leaves original unchanged
- **Test Code:** [TC008_Edit_flow_blocks_invalid_data_and_cancel_leaves_original_unchanged.py](./TC008_Edit_flow_blocks_invalid_data_and_cancel_leaves_original_unchanged.py)
- **Test Error:** Cancel did not preserve the last saved values — the transaction amount changed to a negative value after cancelling the edit.

Observations:
- Validation error appeared in the Edit Transaction modal: Amount input showed '-5' with an inline tooltip 'Value must be greater than or equal to 0.'
- The Edit modal was closed by clicking the Cancel button.
- The transaction 'Cancel Edit Original' is present in the transactions list.
- The displayed Amount in the transactions list is '-₹20' (negative twenty), expected '₹20' (positive twenty).
- The transaction was originally created successfully with amount 20.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/4390669a-df44-41d7-8e38-0d8afd19c6f7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Delete a transaction after confirming removal
- **Test Code:** [TC009_Delete_a_transaction_after_confirming_removal.py](./TC009_Delete_a_transaction_after_confirming_removal.py)
- **Test Error:** Unable to add the test transaction because the Add Transaction form rejects positive amounts. The amount field is limited to a maximum of 0, so the form cannot be submitted and the transaction was not created.

Observations:
- The Add Transaction modal stayed open after clicking Add Transaction and the amount field showed invalid state.
- The amount input has attributes valuemin=0 and valuemax=0 while valuetext shows 9, preventing positive amounts.
- Clicking the submit button did not add a new row; the transactions list does not contain 'Delete Me'.
- The form is otherwise filled: Description='Delete Me', Category='Food', Type='Expense', Date='2026-04-03'.
- No successful creation of the transaction was observed, so deletion/confirmation cannot be tested.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/1b45d116-f059-4129-8344-be234575c0e2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Delete confirmation cancel keeps the transaction in the list
- **Test Code:** [TC010_Delete_confirmation_cancel_keeps_the_transaction_in_the_list.py](./TC010_Delete_confirmation_cancel_keeps_the_transaction_in_the_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/58af6b33-0554-4091-86dc-6a3befcb7d5c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Filter transactions by search and filters, then clear to restore full list
- **Test Code:** [TC011_Filter_transactions_by_search_and_filters_then_clear_to_restore_full_list.py](./TC011_Filter_transactions_by_search_and_filters_then_clear_to_restore_full_list.py)
- **Test Error:** Clearing filters did not restore the full transactions list — only 'Filter Alpha' remained visible after using the 'Clear all' control.

Observations:
- Two transactions ('Filter Alpha' and 'Filter Beta') were added and were visible before applying filters.
- Searching for 'Filter Alpha' correctly narrowed the table to only 'Filter Alpha'.
- The 'Clear all' control was clicked to remove filters.
- After clearing, the transactions table still showed only 'Filter Alpha' instead of restoring 'Filter Beta'.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/62283120-4db8-4bab-814a-69f8d5da32c0
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 No-results state appears for restrictive filters and recovers when cleared
- **Test Code:** [TC012_No_results_state_appears_for_restrictive_filters_and_recovers_when_cleared.py](./TC012_No_results_state_appears_for_restrictive_filters_and_recovers_when_cleared.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/3ba046b9-bfa6-4e54-bd42-18449fa9fbcc
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Insights page loads and shows comparisons, rankings, and anomalies content
- **Test Code:** [TC013_Insights_page_loads_and_shows_comparisons_rankings_and_anomalies_content.py](./TC013_Insights_page_loads_and_shows_comparisons_rankings_and_anomalies_content.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/5b00f9ad-9a0e-4b97-9c9f-9accca9d45c1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Acknowledge or dismiss an anomaly alert in insights
- **Test Code:** [TC014_Acknowledge_or_dismiss_an_anomaly_alert_in_insights.py](./TC014_Acknowledge_or_dismiss_an_anomaly_alert_in_insights.py)
- **Test Error:** No anomaly alerts were available to acknowledge or dismiss on the Insights page, so the requested verification could not be performed.

Observations:
- The Spending Anomalies card displays 'All spending looks normal'.
- The text 'No spending anomalies detected this month' is visible.
- No anomaly alert items or acknowledge/dismiss buttons were found in the Spending Anomalies section.
- The Insights navigation link was clicked and the Insights page loaded successfully.
- The Spending Anomalies section exists but contains no interactive controls for acknowledging or dismissing alerts.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/4d2cbbdc-77cd-4609-9fdb-66c870709163
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Insights shows insufficient-data notice when history is too short
- **Test Code:** [TC015_Insights_shows_insufficient_data_notice_when_history_is_too_short.py](./TC015_Insights_shows_insufficient_data_notice_when_history_is_too_short.py)
- **Test Error:** The Insights page did not show an insufficient-data notice or any guidance about adding more transactions or expanding the date range. The feature to display an insufficient-data message and related guidance appears to be missing from the Insights view.

Observations:
- The page displays summary panels and a 'Monthly Income vs Expenses' chart with income and expense bars.
- A 'Great savings rate!' tip is visible with the message 'You're saving 73.6% of your income.'
- The spending anomalies panel shows 'All spending looks normal' and 'No spending anomalies detected this month.'
- No text matching 'insufficient', 'insufficient data', 'no data', 'add more transactions', or 'expand date range' was found on the Insights page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/7080d8b5-e93b-4963-9bac-0e01102bc077
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Persist Dark theme across reload
- **Test Code:** [TC016_Persist_Dark_theme_across_reload.py](./TC016_Persist_Dark_theme_across_reload.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/89a91201-2285-473b-9ca5-40aff079c47b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Switch back to Light theme
- **Test Code:** [TC017_Switch_back_to_Light_theme.py](./TC017_Switch_back_to_Light_theme.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/23ca3015-7f97-4b82-b61e-a89e005914c0
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Viewer role hides or disables editing and destructive actions across the app
- **Test Code:** [TC018_Viewer_role_hides_or_disables_editing_and_destructive_actions_across_the_app.py](./TC018_Viewer_role_hides_or_disables_editing_and_destructive_actions_across_the_app.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/5b9752cd-8994-4b3c-a01f-b6e52d20a831
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Viewer role cannot initiate editing on a transaction
- **Test Code:** [TC019_Viewer_role_cannot_initiate_editing_on_a_transaction.py](./TC019_Viewer_role_cannot_initiate_editing_on_a_transaction.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/e8ae889e-eb05-40ed-9ea0-021aee9bccb4
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Admin role re-enables editing and destructive actions
- **Test Code:** [TC020_Admin_role_re_enables_editing_and_destructive_actions.py](./TC020_Admin_role_re_enables_editing_and_destructive_actions.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/2ee1c444-4166-43fd-af58-29efda56ba3b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Theme setting remains consistent when navigating between pages
- **Test Code:** [TC021_Theme_setting_remains_consistent_when_navigating_between_pages.py](./TC021_Theme_setting_remains_consistent_when_navigating_between_pages.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/6864c57f-de29-4feb-9cc4-d5ab5ec188a1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Role setting remains consistent when navigating between pages
- **Test Code:** [TC022_Role_setting_remains_consistent_when_navigating_between_pages.py](./TC022_Role_setting_remains_consistent_when_navigating_between_pages.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/92c5ff3c-118b-455f-8734-102bf1f17656
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Reload retains Viewer role restrictions
- **Test Code:** [TC023_Reload_retains_Viewer_role_restrictions.py](./TC023_Reload_retains_Viewer_role_restrictions.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/17dd82c6-f054-434a-8993-355639a0fb6d/c4c8983d-5316-4895-9910-55af3a351fb5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **65.22** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---