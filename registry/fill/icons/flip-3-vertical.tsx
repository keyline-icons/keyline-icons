import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flip3Vertical({ size = 24, ...props }: IconProps) {
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
      <path d="M13.7712 13L21 13C22.1046 13 23 13.8954 23 15L23 20.9981C23 21.0013 23 21.0045 23 21.0076C23 21.5257 22.7971 22.0232 22.4348 22.3935C22.0949 22.7402 21.6416 22.9531 21.1577 22.9933C21.1038 22.9977 21.0497 23 20.9956 23C20.5302 23 20.0796 22.8362 19.7228 22.5373L12.4942 16.5392C12.0546 16.1797 11.791 15.6485 11.7706 15.0811C11.7697 15.0577 11.7693 15.0343 11.7693 15.0109C11.7693 14.5129 11.9522 14.0322 12.2833 13.6601C12.6581 13.2401 13.1942 12.9999 13.7571 12.9999C13.7618 12.9999 13.7665 13 13.7712 13ZM13.7712 11C13.7665 11 13.7618 11.0001 13.7571 11.0001C13.1942 11.0001 12.6581 10.7599 12.2833 10.3399C11.9522 9.9678 11.7693 9.4871 11.7693 8.9891C11.7693 8.9657 11.7697 8.9423 11.7706 8.9189C11.791 8.3515 12.0546 7.8203 12.4942 7.4608L19.7228 1.4627C20.0796 1.1638 20.5302 1 20.9956 1C21.0497 1 21.1038 1.0023 21.1577 1.0067C21.6416 1.0469 22.0949 1.2598 22.4348 1.6065C22.7971 1.9768 23 2.4743 23 2.9924C23 2.9955 23 2.9987 23 3.0019L23 9C23 10.1046 22.1046 11 21 11L13.7712 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5 22L5 2M2 19L5 22L8 19M2 5L5 2L8 5" fill="none"/>
    </svg>
  )
}
