import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronsCompactFourDirections({ size = 24, ...props }: IconProps) {
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
      <path d="M14.4298 19.17C14.8834 18.86 15.5065 18.97 15.8214 19.43C16.136 19.88 16.0238 20.5 15.5705 20.82L12.794 22.75C12.3104 23.08 11.6897 23.08 11.206 22.75L8.4296 20.82C7.9761 20.5 7.8638 19.88 8.1786 19.43C8.4936 18.97 9.1166 18.86 9.5703 19.17L12 20.86L14.4298 19.17Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M19.43 8.17C19.8836 7.85 20.5067 7.97 20.8216 8.42L22.7484 11.2C23.0839 11.68 23.0839 12.3 22.7484 12.79L20.8216 15.57C20.5067 16.02 19.8836 16.13 19.43 15.82C18.9764 15.5 18.8642 14.88 19.179 14.42L20.8646 11.99L19.179 9.56C18.8642 9.11 18.9764 8.48 19.43 8.17ZM3.1785 8.42C3.4934 7.97 4.1165 7.85 4.5701 8.17C5.0234 8.48 5.1358 9.11 4.8211 9.56L3.1345 11.99L4.8211 14.42C5.1357 14.88 5.0234 15.5 4.5701 15.82C4.1165 16.13 3.4934 16.02 3.1785 15.57L1.2516 12.79C0.9161 12.3 0.9161 11.68 1.2516 11.2L3.1785 8.42ZM11.2061 1.24C11.6593 0.92 12.2794 0.93 12.7476 1.21L15.5705 3.16C16.0237 3.48 16.1361 4.1 15.8215 4.56C15.5066 5.01 14.8834 5.12 14.4298 4.81L12 3.12L9.5703 4.81C9.1167 5.12 8.4936 5.01 8.1786 4.56C7.8638 4.1 7.9761 3.48 8.4296 3.16L11.2061 1.24Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
