import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanBox({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8V6C3 4.343 4.3432 3 6 3H8M16 3H18C19.6569 3 21 4.343 21 6V8M21 16V18C21 19.657 19.6569 21 18 21H16M8 21H6C4.3432 21 3 19.657 3 18V16" strokeOpacity="0.4"/>
      <path d="M7.1542 9.503L7.1542 9.503M7.1542 9.503L12 12M7.1542 9.503C7.2486 9.354 7.3827 9.229 7.5463 9.146L11.5463 7.109C11.8314 6.964 12.1687 6.964 12.4538 7.109L16.4538 9.146C16.6174 9.229 16.7515 9.354 16.8458 9.503C16.9447 9.66 17 9.844 17 10.037V13.963C17 14.339 16.789 14.684 16.4538 14.854L12.4538 16.891C12.3112 16.964 12.1556 17 12 17C11.8444 17 11.6888 16.964 11.5463 16.891L7.5463 14.854C7.2111 14.684 7 14.339 7 13.963V10.037C7 9.844 7.0553 9.66 7.1542 9.503ZM12 12L16.8458 9.503M12 12V17"/>
    </svg>
  )
}
