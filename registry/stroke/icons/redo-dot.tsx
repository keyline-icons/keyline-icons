import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RedoDot({ size = 24, ...props }: IconProps) {
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
      <path d="M3 17.9998C3 13.9534 5.3726 10.283 9.0622 8.6216C12.7518 6.9602 17.0727 7.6166 20.1025 10.2987M21 6.0002V11H16"/>
      <path d="M11.2851 16.9998C11.2851 18.1044 12.1805 18.9998 13.2851 18.9998C14.3897 18.9998 15.2851 18.1044 15.2851 16.9998C15.2851 15.8952 14.3897 14.9998 13.2851 14.9998C12.1805 14.9998 11.2851 15.8952 11.2851 16.9998Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
