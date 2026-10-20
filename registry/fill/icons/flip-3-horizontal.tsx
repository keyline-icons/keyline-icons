import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flip3Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M11 13.7712L11 21C11 22.1046 10.1046 23 9 23L3.0019 23C2.9987 23 2.9955 23 2.9924 23C2.4743 23 1.9768 22.7971 1.6065 22.4348C1.2598 22.0949 1.0469 21.6416 1.0067 21.1577C1.0023 21.1038 1 21.0497 1 20.9956C1 20.5302 1.1638 20.0796 1.4627 19.7228L7.4608 12.4942C7.8203 12.0546 8.3515 11.791 8.9189 11.7706C8.9423 11.7697 8.9657 11.7693 8.9891 11.7693C9.4871 11.7693 9.9678 11.9522 10.3399 12.2833C10.7599 12.6581 11.0001 13.1942 11.0001 13.7571C11.0001 13.7618 11 13.7665 11 13.7712ZM13 13.7712C13 13.7665 12.9999 13.7618 12.9999 13.7571C12.9999 13.1942 13.2401 12.6581 13.6601 12.2833C14.0322 11.9522 14.5129 11.7693 15.0109 11.7693C15.0343 11.7693 15.0577 11.7697 15.0811 11.7706C15.6485 11.791 16.1797 12.0546 16.5392 12.4942L22.5373 19.7228C22.8362 20.0796 23 20.5302 23 20.9956C23 21.0497 22.9977 21.1038 22.9933 21.1577C22.9531 21.6416 22.7402 22.0949 22.3935 22.4348C22.0232 22.7971 21.5257 23 21.0076 23C21.0045 23 21.0013 23 20.9981 23L15 23C13.8954 23 13 22.1046 13 21L13 13.7712Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 5L22 5M5 2L2 5L5 8M19 2L22 5L19 8" fill="none"/>
    </svg>
  )
}
