import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceTearsJoy({ size = 24, ...props }: IconProps) {
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
      <path d="M14.25 21.744C13.512 21.914 12.757 22 12 22C11.243 22 10.488 21.914 9.75 21.744M2.075 13.219C2.025 12.814 2 12.407 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 12.407 21.975 12.814 21.926 13.219M8.5 7.5L10 8.75L8.5 10M15.5 7.5L14 8.75L15.5 10"/>
      <path d="M12 13H14.829C15.518 13 16.107 13.344 16.461 13.844C16.815 14.345 16.944 15.015 16.715 15.665C16.015 17.649 14.134 19 12 19C9.866 19 7.985 17.649 7.285 15.665C7.056 15.015 7.185 14.345 7.539 13.844C7.893 13.344 8.482 13 9.171 13H12ZM1.879 22.121C1.337 21.58 1 20.828 1 20C1 19.38 1.192 18.776 1.55 18.269L2.775 16.535C3.056 16.137 3.513 15.9 4 15.9C4.487 15.9 4.944 16.137 5.225 16.534L6.45 18.269C6.808 18.776 7 19.38 7 20C7 21.657 5.657 23 4 23C3.172 23 2.421 22.663 1.879 22.121ZM22.121 22.121C21.58 22.663 20.828 23 20 23C18.343 23 17 21.657 17 20C17 19.38 17.192 18.776 17.55 18.269L18.775 16.535C19.056 16.137 19.513 15.9 20 15.9C20.487 15.9 20.944 16.137 21.225 16.534L22.45 18.269C22.808 18.776 23 19.38 23 20C23 20.828 22.663 21.58 22.121 22.121Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
