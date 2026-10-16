import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PackageArrowUp({ size = 24, ...props }: IconProps) {
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
      <path d="M2.3084 7.0066L12 12M12 12L21.6916 7.0066M7 4.3017L17 9.4239M12 12L12 22C11.6888 22 11.3776 21.9274 11.0925 21.7822L3.0925 17.7086C2.4221 17.3672 2 16.6786 2 15.9263L2 8.0737C2 7.3214 2.4221 6.6328 3.0925 6.2914L11.0925 2.2178C11.6627 1.9274 12.3373 1.9274 12.9075 2.2178L20.9075 6.2914C21.5779 6.6328 22 7.3214 22 8.0737L22 12M19 22V16M16 19L19 16L22 19"/>
    </svg>
  )
}
