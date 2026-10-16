import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorWindow({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.8295 11.4097L13.7772 20.6718C13.9071 21.0802 14.4723 21.1169 14.6542 20.7287L16.5751 16.6314C16.625 16.5252 16.7127 16.4414 16.8213 16.3963L20.7094 14.7824C21.1122 14.6153 21.0913 14.0396 20.6776 13.9017L11.4287 10.8211C11.0628 10.6992 10.7128 11.043 10.8295 11.4097Z" fill="currentColor" stroke="none"/>
      <path d="M10 20L3 20L3 3L20 3L20 10M6 7L10 7M10.5489 10.528L14.1426 21L16.6527 16.4663L21 14.3L10.5489 10.528Z"/>
    </svg>
  )
}
