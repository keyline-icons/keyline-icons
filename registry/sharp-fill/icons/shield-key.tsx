import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldKey({ size = 24, ...props }: IconProps) {
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
      <path d="M21 5.3088L21 15.778C21 15.9994 20.9265 16.2146 20.7911 16.3897L19.4031 18.1846C18.148 19.8076 16.0328 21.7411 13.1746 22.7912C12.4724 23.0492 11.5276 23.0492 10.8253 22.7911C7.9672 21.7411 5.852 19.8076 4.5969 18.1846L3.2089 16.3895C3.0735 16.2143 3 15.9992 3 15.7778L3 5.3088C3 4.8021 3.379 4.3755 3.8821 4.3158L5.0646 4.1754C7.4767 3.8892 9.2001 2.7495 10.3279 1.6554C11.1316 0.8756 12.8684 0.8756 13.6721 1.6554C14.7999 2.7495 16.5233 3.8892 18.9353 4.1754L20.1179 4.3158C20.621 4.3755 21 4.8021 21 5.3088ZM13 12.3284C14.1986 11.9046 15 10.7713 15 9.5C15 7.8431 13.6569 6.5 12 6.5C10.3431 6.5 9 7.8431 9 9.5C9 10.7713 9.8014 11.9046 11 12.3284L11 18.5L13 18.5L13 16.5L15 16.5L15 14.5L13 14.5L13 12.3284ZM13 9.5C13 10.0523 12.5523 10.5 12 10.5C11.4477 10.5 11 10.0523 11 9.5C11 8.9477 11.4477 8.5 12 8.5C12.5523 8.5 13 8.9477 13 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
