import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandClosed({ size = 24, ...props }: IconProps) {
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
      <path d="M11.6137 3.0002C12.5592 3.0003 13.3863 3.4845 13.8724 4.215C14.2277 4.0432 14.626 3.9445 15.0482 3.9445C16.1771 3.9446 17.1381 4.6344 17.5501 5.6104C17.9398 5.5156 18.3775 5.5068 18.8518 5.6192C19.7103 5.8229 20.2437 6.5122 20.4524 7.1865C20.8816 8.5749 21.1542 10.5968 20.9045 12.7029C20.6542 14.8144 19.8685 17.088 18.0999 18.8716C17.3755 19.602 16.2586 20.1939 15.016 20.5629C13.7571 20.9367 12.2844 21.1085 10.7944 20.9271C7.7549 20.5569 4.699 18.7141 3.3228 14.3776C3.3197 14.3677 3.3168 14.3573 3.314 14.3474C3.1922 13.9175 3.0532 13.2309 3.0122 12.5018C2.9729 11.8016 3.0139 10.9075 3.3804 10.1679C3.8505 9.2198 4.6532 8.7463 5.5249 8.746C5.6133 8.746 5.7013 8.7514 5.7876 8.7607L5.6167 6.9444C5.4827 5.5252 6.5116 4.2498 7.938 4.1056C8.4163 4.0574 8.8758 4.1455 9.2817 4.3341C9.7547 3.5379 10.618 3.0003 11.6137 3.0002Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9.8959 6.4988L9.8959 7.4634M13.3303 6.6762L13.3303 7.4634M16.7648 7.4633L16.7648 8.0931M6.937 10.297L7.0858 11.8712"/>
    </svg>
  )
}
