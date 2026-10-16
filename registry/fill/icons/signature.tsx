import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Signature({ size = 24, ...props }: IconProps) {
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
      <path d="M2 21C3.1938 18.9186 4.7128 16.0493 5.9929 13.2135M5.99294 13.2135C8.20397 8.31533 9.7023 3.51693 7.5814 3.05055C3.63084 2.18185 2.58008 12.7908 5.99294 13.2135ZM5.99294 13.2135C6.19638 13.2387 6.41568 13.2277 6.65116 13.1759C10.8372 12.2554 11.3023 8.57347 11.7674 10.4144C12.2326 12.2554 13.1628 14.0964 14.5581 13.6361C15.9535 13.1759 16.4186 10.8747 17.3488 12.2554C18.2791 13.6361 20.6047 13.6361 22 13.6361M8.5 18L22 18" fill="none"/>
    </svg>
  )
}
