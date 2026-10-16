import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Earth({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM15.4202 2.6031L15.4958 6.2951C15.4986 6.4313 15.5153 6.5669 15.5457 6.6998L16.178 9.4663C16.2579 9.8157 16.2424 10.1801 16.1331 10.5215L15.5302 12.4057C15.5101 12.4684 15.4839 12.529 15.4519 12.5866L15.0508 13.3086C14.6367 14.0539 13.5397 13.9724 13.2403 13.1741L12.957 12.4188C12.8571 12.1523 12.6484 11.941 12.3832 11.8379L11.8626 11.6355C11.3758 11.4462 10.8253 11.6634 10.5989 12.1342L9.363 14.705C9.0066 15.4463 7.9575 15.4644 7.5759 14.7358L6.4431 12.5732C6.3499 12.3952 6.2052 12.2494 6.0279 12.1549L5.2247 11.7265C4.9563 11.5834 4.6373 11.5702 4.358 11.6907L2.0244 12.6976M21.9452 13.0453L18.5505 15.7235C18.3197 15.9056 18.1318 16.1363 18.0004 16.3993L16.8444 18.7113C16.8148 18.7704 16.7823 18.828 16.7471 18.8839L15.0902 21.5106"/>
    </svg>
  )
}
