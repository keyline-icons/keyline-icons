import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HexagonThreeQuarter({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.981 1.547C10.5935 1.1888 11.2904 1 12 1C12.7096 1 13.4065 1.1888 14.019 1.547L20.019 5.0552C21.2459 5.7726 22 7.0871 22 8.5083L22 15.4917C22 16.9129 21.2459 18.2274 20.019 18.9448L14.019 22.453C13.4065 22.8112 12.7096 23 12 23C11.2904 23 10.5935 22.8112 9.981 22.453L3.981 18.9448C2.7541 18.2274 2 16.9129 2 15.4917L2 8.5083C2 7.0871 2.7541 5.7726 3.981 5.0552Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M11 9.0792L11 6.1584C11 5.6061 11.4477 5.1584 12 5.1584C12.1774 5.1584 12.3516 5.2056 12.5048 5.2951L16.7619 7.7843C17.5287 8.2326 18 9.0542 18 9.9425L18 14.0575C18 14.9458 17.5287 15.7674 16.7618 16.2157L13.2619 18.2622C12.4824 18.718 11.5176 18.718 10.7381 18.2621L7.2381 16.2157C6.4713 15.7674 6 14.9458 6 14.0575L6 12C6 11.4477 6.4477 11 7 11L11 11Z" fill="currentColor"/>
    </svg>
  )
}
