import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaperBag({ size = 24, ...props }: IconProps) {
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
      <path d="M2 21L2 3C2 2.4477 2.4477 2 3 2L4 2C4.7573 2 5.4942 2.2456 6.1 2.7C6.3596 2.8947 6.6754 3 7 3C7.3246 3 7.6404 2.8947 7.9 2.7C8.5058 2.2456 9.2427 2 10 2C10.7573 2 11.4942 2.2456 12.1 2.7C12.3596 2.8947 12.6754 3 13 3C13.3246 3 13.6404 2.8947 13.9 2.7C14.5058 2.2456 15.2427 2 16 2L17 2C17.4687 2 17.8745 2.3255 17.9762 2.7831L21.9762 20.7831C21.992 20.8543 22 20.927 22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21ZM7 7L7 9L13 9L13 7L7 7ZM18 12.1098L18 20L19.7534 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
