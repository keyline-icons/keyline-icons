import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GuidepointVerticalArrowLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M16.9895 15C19.2036 15 20.9986 16.79 20.9986 19C20.9986 21.21 19.2036 23 16.9895 23C14.7754 23 12.9805 21.21 12.9805 19C12.9805 16.79 14.7754 15 16.9895 15ZM16.9895 1C19.2036 1 20.9986 2.79 20.9986 5C20.9986 7.21 19.2036 9 16.9895 9C14.7754 9 12.9805 7.21 12.9805 5C12.9805 2.79 14.7754 1 16.9895 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17.0985 7C17.5577 7.09 17.9935 7.51 17.9939 8V16C17.9933 16.48 17.5488 16.91 17.0897 17C16.5405 16.99 15.989 16.55 15.9884 16V8C15.9888 7.45 16.5455 7 17.0985 7ZM8.7167 7.21C9.1503 6.98 9.7938 7 10.1863 7.18C10.623 7.46 10.9769 8 10.9771 8.55V15.45C10.9767 16 10.6996 16.49 10.2626 16.77C9.8453 17.03 9.2877 17.09 8.7925 16.83L8.7885 16.83L8.6907 16.77C8.6842 16.77 8.6773 16.76 8.6721 16.76L8.6701 16.76C8.669 16.76 8.6671 16.76 8.6662 16.76C8.6654 16.76 8.6652 16.76 8.6642 16.75L8.6554 16.75L3.649 13.3C3.6475 13.3 3.6452 13.3 3.6432 13.3C3.6371 13.29 3.6303 13.28 3.6236 13.28C2.7905 12.7 2.816 11.41 3.5575 10.76L8.7167 7.21Z" fill="currentColor"/>
    </svg>
  )
}
