import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.8553 2 23 5.8327 23 11C23 16.1673 17.8553 20 12 20C11.2351 20 10.4723 19.9337 9.7236 19.8047L5.4385 21.8984C5.1434 22.0425 4.7961 22.0329 4.5098 21.8721C4.2235 21.7112 4.0344 21.4197 4.0039 21.0928L3.6084 16.8252C1.9521 15.2269 1 13.1718 1 11C1 5.8327 6.1447 2 12 2ZM13.3787 6.9184C13.1423 6.3669 12.6 6.0093 12 6.0093C11.4 6.0093 10.8577 6.3669 10.6213 6.9184L9.8104 8.8104L7.9184 9.6213C7.3669 9.8577 7.0093 10.4 7.0093 11C7.0093 11.6 7.3669 12.1423 7.9184 12.3787L9.8104 13.1896L10.6213 15.0816C10.8577 15.6331 11.4 15.9907 12 15.9907C12.6 15.9907 13.1423 15.6331 13.3787 15.0816L14.1896 13.1896L16.0816 12.3787C16.6331 12.1423 16.9907 11.6 16.9907 11C16.9907 10.4 16.6331 9.8577 16.0816 9.6213L14.1896 8.8104L13.3787 6.9184Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
