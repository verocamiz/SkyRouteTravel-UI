# SkyRoute Travel — UI

Angular 20 app for flight search, booking, and confirmation. Requires **SkyRouteTravel-API** running locally.
 
```
** UI:**

```bash
npm install
ng serve
```

Open http://localhost:4200 — API base URL: `http://localhost:5014/api` (`src/app/core/config/api-config.ts`).

**Demo search:** EZE → COR, `2026-07-06`, Economy

## Flow

`Search` → select flight → `Booking` → confirm → `Confirmation` (booking reference).

## Architecture

- **Standalone components** — one page per step: `search-component`, `booking-component`, `confirmation-component`.
- **`core/`** — models (API contracts), `FlightService` / `BookingService`, hardcoded airports for dropdowns and passport vs national ID.
- **Router state** — passes selected flight and booking reference between routes (no global store).
- **Reactive forms** — search validation; booking with dynamic document label (Passport / National ID) by route.
- **Client-side sort** — price, duration, departure; no extra API calls on sort change.
- **Bootstrap 5** — global styles only.

## Trade-offs and limitations

- Refresh or direct URL to `/booking` or `/confirmation` loses state (redirects to search).
- Returning from booking does not restore the previous search results.
- No guards, interceptors, lazy routes, or environment files.
- Airports hardcoded; API has no airport catalog.
- Single passenger form.

